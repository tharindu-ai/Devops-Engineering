# Event Registration Management - DevOps Automation

Complete DevOps automation setup for the Event Registration Management application using GitHub, Docker, Jenkins, Terraform, Ansible, and AWS.

## Architecture Overview

```
┌──────────────┐
│   GitHub     │
│  Repository  │
└──────┬───────┘
       │ (Push/PR)
       ▼
┌──────────────────────────────────────────┐
│  GitHub Actions CI/CD Pipeline           │
│  - Build Docker images                   │
│  - Run tests & linting                   │
│  - Security scanning (Trivy)             │
│  - Push to Docker Hub                    │
└──────┬───────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────┐
│  Jenkins Pipeline                        │
│  - Checkout code                         │
│  - Build backend/frontend                │
│  - Test & lint                           │
│  - Push images                           │
│  - Terraform plan/apply                  │
│  - Ansible provision/deploy              │
│  - Smoke tests                           │
└──────┬───────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────┐
│  AWS Infrastructure (Terraform)          │
│  - VPC, Subnets, IGW, Route Tables       │
│  - Security Groups                       │
│  - EC2 Instance (Ubuntu 22.04)           │
│  - Elastic IP                            │
│  - CloudWatch Logs & Alarms              │
└──────┬───────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────┐
│  EC2 Instance Configuration (Ansible)    │
│  - Docker & Docker Compose               │
│  - Node.js & npm                         │
│  - Security groups (UFW)                 │
│  - Application deployment                │
│  - Log rotation & monitoring             │
└──────┬───────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────┐
│  Running Services                        │
│  - Backend API (Node.js/Express)         │
│  - Frontend (React/Vite)                 │
│  - MongoDB                               │
│  - Redis Cache                           │
└──────────────────────────────────────────┘
```

## Prerequisites

### Local Development
- Docker & Docker Compose
- Node.js 18+
- Git
- Text editor (VS Code recommended)

### Jenkins Server
- Jenkins 2.400+
- Docker installed on Jenkins agent
- SSH key for GitHub access
- AWS credentials configured

### AWS Account
- AWS CLI configured with `ap-south-1` region
- IAM user with EC2, VPC, CloudWatch permissions
- Access key ID & secret access key

### Ansible Control Node
- Ansible 2.10+
- Python 3.8+
- SSH key pair for EC2 access

## Project Structure

```
Event-Registration-Management/
├── Jenkinsfile                    # Jenkins CI/CD pipeline
├── docker-compose.yml             # Local development & production compose
├── .github/
│   └── workflows/
│       └── cicd.yml               # GitHub Actions workflow
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── models/
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── src/
│       ├── pages/
│       ├── components/
│       └── App.jsx
├── terraform-cd/
│   ├── provider.tf                # AWS provider & backend config
│   ├── main.tf                    # VPC, EC2, Security Groups
│   ├── variables.tf               # Input variables
│   ├── outputs.tf                 # Output values
│   ├── user_data.sh               # EC2 initialization script
│   ├── terraform.tfstate          # State file (git-ignored)
│   └── .terraform/
└── ansible/
    ├── ansible.cfg                # Ansible configuration
    ├── inventory.ini              # Inventory with EC2 hosts
    └── playbooks/
        ├── provision.yml          # System provisioning
        ├── deploy.yml             # Application deployment
        └── rollback.yml           # Deployment rollback
```

## Setup Instructions

### 1. Local Development Setup

Clone the repository:
```bash
git clone https://github.com/your-username/Event-Registration-Management.git
cd Event-Registration-Management
```

Create environment file:
```bash
cat > .env <<EOF
MONGO_ROOT_USER=admin
MONGO_ROOT_PASSWORD=SecurePassword123!
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
VITE_API_URL=http://localhost:5000
EOF
```

Start services with Docker Compose:
```bash
docker-compose up -d
```

Verify services:
```bash
curl http://localhost:5000/api/auth    # Backend
curl http://localhost:5173             # Frontend
```

### 2. GitHub Setup

Create GitHub secrets (Settings → Secrets → New repository secret):
- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub access token
- `AWS_ACCESS_KEY_ID`: AWS access key
- `AWS_SECRET_ACCESS_KEY`: AWS secret key
- `JENKINS_URL`: Jenkins server URL
- `JENKINS_USER`: Jenkins username
- `JENKINS_TOKEN`: Jenkins API token

### 3. Jenkins Setup

Install Jenkins plugins:
```bash
# Required plugins:
# - Docker Pipeline
# - GitHub Integration
# - Terraform
# - Ansible
# - Pipeline
```

Create Jenkins credentials:
```bash
# AWS Credentials
# Docker Credentials
# GitHub SSH Key
```

Create Jenkins Pipeline job:
1. New Item → Pipeline
2. Pipeline script from SCM → GitHub repository
3. Script path: `Jenkinsfile`
4. Build triggers: GitHub hook trigger for GITScm polling

### 4. AWS & Terraform Setup

Initialize Terraform:
```bash
cd terraform-cd
terraform init
```

Create terraform.tfvars:
```bash
cat > terraform.tfvars <<EOF
aws_region   = "ap-south-1"
environment  = "staging"
instance_type = "t3.micro"
enable_monitoring = true
app_name = "event-registration"
EOF
```

Plan infrastructure:
```bash
terraform plan -out=tfplan
```

Apply infrastructure:
```bash
terraform apply tfplan
```

Get outputs:
```bash
terraform output -json
```

### 5. Ansible Setup

Generate SSH key pair:
```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/event-registration -C "devops@event-registration"
```

Update Ansible inventory with EC2 public IP:
```bash
cd ansible
# Replace TARGET_HOST in inventory.ini with the EC2 instance IP from Terraform output
sed -i 's/TARGET_HOST/<EC2_PUBLIC_IP>/g' inventory.ini
```

Test Ansible connectivity:
```bash
ansible all -i inventory.ini -m ping
```

Run provisioning playbook:
```bash
ansible-playbook -i inventory.ini playbooks/provision.yml -v
```

Run deployment playbook:
```bash
ansible-playbook -i inventory.ini playbooks/deploy.yml \
  -e "backend_image=your-username/event-reg-backend:latest" \
  -e "frontend_image=your-username/event-reg-frontend:latest" \
  -v
```

## CI/CD Pipeline Stages

### GitHub Actions (Automated on push to main/develop)
1. **Checkout** - Clone repository
2. **Build** - Build Docker images for backend & frontend
3. **Push** - Push images to Docker Hub
4. **Test** - Run linting & unit tests
5. **Security Scan** - Scan images with Trivy
6. **Trigger Jenkins** - Trigger Jenkins pipeline for deployment

### Jenkins Pipeline (Manual or GitHub trigger)
1. **Checkout** - Clone code from GitHub
2. **Build Backend** - Build backend Docker image
3. **Build Frontend** - Build frontend Docker image
4. **Test Backend** - Run backend linting & tests
5. **Test Frontend** - Run frontend linting
6. **Push to Docker Hub** - Push images to registry
7. **Plan Infrastructure** - Terraform plan with auto-approval
8. **Apply Infrastructure** - Terraform apply to provision AWS resources
9. **Configure with Ansible** - Provision EC2 instance
10. **Deploy Application** - Deploy containers using Ansible
11. **Smoke Tests** - Verify application endpoints
12. **Cleanup** - Remove local Docker images

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb://admin:password@mongodb:27017/event-db?authSource=admin
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your-secret-key
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
NODE_ENV=production
```

### Terraform (terraform.tfvars)
```
aws_region      = "ap-south-1"
environment     = "staging"
instance_type   = "t3.micro"
enable_monitoring = true
```

### Ansible (inventory.ini variables)
```
ansible_user=ubuntu
ansible_ssh_private_key_file=~/.ssh/event-registration
backend_image=your-username/event-reg-backend:latest
frontend_image=your-username/event-reg-frontend:latest
```

## Deployment Workflows

### Development (Local)
```bash
docker-compose up -d
docker-compose logs -f
```

### Staging (Automated via GitHub Actions)
1. Push to `develop` branch
2. GitHub Actions builds & tests
3. Manual trigger Jenkins for staging deployment
4. Access via EC2 public IP

### Production (Automated via GitHub + Jenkins)
1. Push to `main` branch
2. GitHub Actions builds, tests, security scans
3. Manual approval in Jenkins for production
4. Full infrastructure & application deployment
5. Smoke tests verify endpoints

## Monitoring & Logging

### CloudWatch
- View logs in AWS Console → CloudWatch → Log Groups
- Log group: `/aws/ec2/event-registration-logs`
- Alarms: CPU utilization > 80%

### Application Logs
```bash
# SSH into EC2
ssh -i ~/.ssh/event-registration ubuntu@<PUBLIC_IP>

# View Docker logs
docker logs event-backend -f
docker logs event-frontend -f
docker logs event-mongodb -f

# View system logs
sudo tail -f /var/log/syslog
```

### Health Checks
```bash
# Backend health
curl http://<PUBLIC_IP>:5000/api/auth

# Frontend health
curl http://<PUBLIC_IP>:5173

# MongoDB health
docker exec event-mongodb mongosh -u admin -p password
```

## Rollback Procedure

### Using Ansible Rollback Playbook
```bash
cd ansible
ansible-playbook -i inventory.ini playbooks/rollback.yml -v
```

### Manual Rollback
```bash
# SSH into EC2
ssh -i ~/.ssh/event-registration ubuntu@<PUBLIC_IP>

# Stop containers
docker stop event-backend event-frontend

# Remove containers
docker rm event-backend event-frontend

# Restart previous version from old image tag
docker run -d --name event-backend \
  -e MONGO_URI=mongodb://... \
  your-username/event-reg-backend:previous-tag
```

### Infrastructure Rollback
```bash
cd terraform-cd
terraform destroy -auto-approve
```

## Troubleshooting

### Jenkins Pipeline Fails
```bash
# Check Jenkins logs
docker logs jenkins  # if Jenkins is in Docker

# Check Jenkins agent connectivity
Jenkins Dashboard → Manage Jenkins → System → Check node status
```

### Terraform Apply Fails
```bash
# Check AWS credentials
aws sts get-caller-identity

# Check AWS permissions
aws ec2 describe-instances --region ap-south-1

# Refresh Terraform state
terraform refresh
terraform plan
```

### Ansible Connection Fails
```bash
# Test SSH connectivity
ssh -i ~/.ssh/event-registration ubuntu@<PUBLIC_IP>

# Verify SSH key permissions
chmod 600 ~/.ssh/event-registration

# Check inventory
ansible-inventory -i inventory.ini --list
```

### Docker Image Push Fails
```bash
# Login to Docker Hub
docker login

# Check Docker Hub credentials
cat ~/.docker/config.json

# Verify image exists locally
docker images | grep event-reg
```

### Application Won't Start
```bash
# Check Docker logs
docker logs event-backend

# Check environment variables
docker exec event-backend env

# Verify MongoDB connection
docker exec event-mongodb mongosh mongodb://admin:password@localhost:27017/event-db
```

## Security Best Practices

1. **Secrets Management**
   - Store secrets in Jenkins credentials store
   - Use GitHub Secrets for CI/CD
   - Use Terraform variables for infrastructure secrets
   - Rotate SSH keys regularly

2. **Network Security**
   - Restrict security group ingress rules
   - Use VPC security groups
   - Enable VPC Flow Logs
   - Use HTTPS/SSL for production

3. **Image Security**
   - Scan images with Trivy
   - Use minimal base images (alpine)
   - Keep dependencies updated
   - Sign container images

4. **Access Control**
   - Use IAM roles for EC2 instances
   - Implement RBAC in Jenkins
   - Require branch protection & PR reviews
   - Audit CloudTrail logs

5. **Data Protection**
   - Enable encryption at rest for MongoDB
   - Use encrypted EBS volumes
   - Backup MongoDB regularly
   - Encrypt data in transit (TLS/SSL)

## Cost Optimization

- **EC2**: Use t3.micro for development (included in free tier)
- **Storage**: Set appropriate CloudWatch log retention (7 days default)
- **Monitoring**: Enable detailed monitoring only when needed
- **Data Transfer**: Use VPC endpoints to reduce data transfer costs
- **Scheduled Scaling**: Stop/start instances during off-hours

## Additional Resources

- [Terraform AWS Documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Ansible Documentation](https://docs.ansible.com/)
- [Jenkins Pipeline Documentation](https://www.jenkins.io/doc/book/pipeline/)
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [AWS Best Practices](https://aws.amazon.com/architecture/well-architected/)

## Support & Contribution

For issues, suggestions, or contributions, please:
1. Create GitHub Issue with detailed description
2. Submit Pull Request with proposed changes
3. Follow project code style guidelines
4. Include tests for new features

---

**Last Updated**: January 30, 2026
**Maintained by**: DevOps Team
