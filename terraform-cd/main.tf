# Data source to fetch Ubuntu 22.04 AMI
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Data source to reference existing EC2 key pair
data "aws_key_pair" "existing" {
  key_name = "${var.app_name}-key"

  # Set filter to ensure the key exists, if not will error
  depends_on = []
}

# Note: Key pair creation is skipped as it already exists in AWS
# If you need to recreate key pair, delete it from AWS console first
# resource "tls_private_key" "main" {
#   algorithm = "RSA"
#   rsa_bits  = 4096
# }
#
# resource "aws_key_pair" "main" {
#   key_name   = "${var.app_name}-key"
#   public_key = tls_private_key.main.public_key_openssh
#   tags = {
#     Name = "${var.app_name}-key"
#   }
# }
#
# resource "local_sensitive_file" "private_key" {
#   filename             = "${path.module}/${var.app_name}-key.pem"
#   content              = tls_private_key.main.private_key_pem
#   file_permission      = "0600"
#   directory_permission = "0700"
# }

# VPC
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "${var.app_name}-vpc"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.app_name}-igw"
  }
}

# Public Subnet
resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = data.aws_availability_zones.available.names[0]
  map_public_ip_on_launch = true

  tags = {
    Name = "${var.app_name}-public-subnet"
  }
}

# Availability zones data source
data "aws_availability_zones" "available" {
  state = "available"
}

# Route Table
resource "aws_route_table" "main" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block      = "0.0.0.0/0"
    gateway_id      = aws_internet_gateway.main.id
  }

  tags = {
    Name = "${var.app_name}-rt"
  }
}

# Route Table Association
resource "aws_route_table_association" "main" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.main.id
}

# Security Group
resource "aws_security_group" "app_sg" {
  name        = "${var.app_name}-sg"
  description = "Security group for Event Registration app"
  vpc_id      = aws_vpc.main.id

  # SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Backend API
  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Frontend (Vite dev server)
  ingress {
    from_port   = 5173
    to_port     = 5173
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTP
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTPS
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Egress: Allow all outbound
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.app_name}-sg"
  }
}

# EC2 Instance
resource "aws_instance" "app_server" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.app_sg.id]
  key_name               = data.aws_key_pair.existing.key_name
  
  # User data script to install Docker, Docker Compose, Node.js, and Ansible
  user_data = base64encode(file("${path.module}/user_data.sh"))

  # Enable detailed monitoring
  monitoring = var.enable_monitoring

  # Root volume configuration
  root_block_device {
    volume_type           = "gp3"
    volume_size           = 30
    delete_on_termination = true
  }

  tags = {
    Name = "${var.app_name}-server"
  }

  depends_on = [aws_internet_gateway.main]
}

# Elastic IP (optional, for stable public IP)
resource "aws_eip" "app_server" {
  instance = aws_instance.app_server.id
  domain   = "vpc"

  tags = {
    Name = "${var.app_name}-eip"
  }

  depends_on = [aws_internet_gateway.main]
}

# CloudWatch Log Group for application logs
# Note: Commented out as log group is already created
# resource "aws_cloudwatch_log_group" "app_logs" {
#   name              = "/aws/ec2/${var.app_name}-logs"
#   retention_in_days = 7
#   tags = {
#     Name = "${var.app_name}-logs"
#   }
# }

# Data source to reference existing log group if needed
data "aws_cloudwatch_log_group" "app_logs" {
  name = "/aws/ec2/${var.app_name}-logs"
}

# CloudWatch Alarms
resource "aws_cloudwatch_metric_alarm" "cpu_high" {
  alarm_name          = "${var.app_name}-cpu-high"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = 120
  statistic           = "Average"
  threshold           = 80
  alarm_description   = "Alert when CPU exceeds 80%"

  dimensions = {
    InstanceId = aws_instance.app_server.id
  }
}
