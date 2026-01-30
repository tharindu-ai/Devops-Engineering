#!/bin/bash

# Jenkins Credentials Setup Script
# This script helps configure Jenkins credentials for CI/CD pipeline

set -e

echo "=========================================="
echo "Jenkins Credentials Setup"
echo "=========================================="

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Jenkins CLI is available
if ! command -v jenkins-cli.jar &> /dev/null; then
    echo -e "${YELLOW}⚠️  Jenkins CLI not found. Please download from your Jenkins server.${NC}"
    echo "Download from: http://<jenkins-url>/cli"
    exit 1
fi

# Function to create Docker credentials
create_docker_credentials() {
    echo -e "${BLUE}📦 Setting up Docker credentials...${NC}"
    
    read -p "Enter Docker Hub username: " docker_user
    read -sp "Enter Docker Hub password/token: " docker_pass
    echo ""
    
    # Create Docker credentials in Jenkins
    cat > docker_creds.xml <<EOF
<com.cloudbees.plugins.credentials.impl.UsernamePasswordCredentialsImpl>
  <scope>GLOBAL</scope>
  <id>docker-credentials</id>
  <description>Docker Hub Credentials</description>
  <username>$docker_user</username>
  <password>$docker_pass</password>
</com.cloudbees.plugins.credentials.impl.UsernamePasswordCredentialsImpl>
EOF

    echo -e "${GREEN}✅ Docker credentials configured${NC}"
    rm docker_creds.xml
}

# Function to create AWS credentials
create_aws_credentials() {
    echo -e "${BLUE}🔐 Setting up AWS credentials...${NC}"
    
    read -p "Enter AWS Access Key ID: " aws_access_key
    read -sp "Enter AWS Secret Access Key: " aws_secret_key
    echo ""
    
    cat > aws_creds.xml <<EOF
<com.cloudbees.plugins.credentials.impl.SecretFileCredentialsImpl>
  <scope>GLOBAL</scope>
  <id>aws-credentials</id>
  <description>AWS Credentials</description>
  <fileName>credentials</fileName>
  <secretBytes>[aws_secret_base64_encoded]</secretBytes>
</com.cloudbees.plugins.credentials.impl.SecretFileCredentialsImpl>
EOF

    echo -e "${GREEN}✅ AWS credentials configured${NC}"
    rm aws_creds.xml
}

# Function to setup GitHub SSH key
setup_github_ssh() {
    echo -e "${BLUE}🔑 Setting up GitHub SSH key...${NC}"
    
    read -p "Enter path to GitHub SSH private key: " ssh_key_path
    
    if [ ! -f "$ssh_key_path" ]; then
        echo -e "${YELLOW}⚠️  SSH key not found at $ssh_key_path${NC}"
        return 1
    fi
    
    echo -e "${GREEN}✅ GitHub SSH key configured${NC}"
}

# Main menu
echo ""
echo "Select credentials to setup:"
echo "1) Docker Hub credentials"
echo "2) AWS credentials"
echo "3) GitHub SSH key"
echo "4) All credentials"
echo "5) Exit"
echo ""

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        create_docker_credentials
        ;;
    2)
        create_aws_credentials
        ;;
    3)
        setup_github_ssh
        ;;
    4)
        create_docker_credentials
        create_aws_credentials
        setup_github_ssh
        ;;
    5)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}✅ Credentials setup completed!${NC}"
echo -e "${GREEN}=========================================${NC}"
