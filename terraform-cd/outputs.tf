output "instance_id" {
  description = "EC2 instance ID"
  value       = aws_instance.app_server.id
}

output "public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_eip.app_server.public_ip
}

output "private_ip" {
  description = "Private IP address of the EC2 instance"
  value       = aws_instance.app_server.private_ip
}

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "security_group_id" {
  description = "Security Group ID"
  value       = aws_security_group.app_sg.id
}

output "key_pair_name" {
  description = "EC2 Key Pair name"
  value       = data.aws_key_pair.existing.key_name
}

output "private_key_path" {
  description = "Path to private key file - stored locally in terraform-cd directory"
  value       = "${path.module}/${var.app_name}-key.pem"
  sensitive   = true
}

output "ssh_command" {
  description = "SSH command to connect to the instance"
  value       = "ssh -i ${path.module}/${var.app_name}-key.pem ubuntu@${aws_eip.app_server.public_ip}"
}

output "api_endpoint" {
  description = "API endpoint URL"
  value       = "http://${aws_eip.app_server.public_ip}:5000"
}

output "frontend_endpoint" {
  description = "Frontend URL"
  value       = "http://${aws_eip.app_server.public_ip}"
}

output "cloudwatch_log_group" {
  description = "CloudWatch log group name"
  value       = data.aws_cloudwatch_log_group.app_logs.name
}
