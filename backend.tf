# Terraform Backend Configuration (S3 + DynamoDB)
# Uncomment and fill in values for remote state management

# backend "s3" {
#   bucket         = "event-registration-terraform-state"
#   key            = "prod/terraform.tfstate"
#   region         = "ap-south-1"
#   encrypt        = true
#   dynamodb_table = "terraform-locks"
# }

# For local development, state is stored in terraform.tfstate (git-ignored)
