# Event Registration - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Docker & Docker Compose installed
- Git installed
- Text editor (VS Code recommended)

### Step 1: Clone Repository
```bash
git clone https://github.com/your-username/Event-Registration-Management.git
cd Event-Registration-Management
```

### Step 2: Run Setup Script
```bash
chmod +x scripts/setup-local-dev.sh
./scripts/setup-local-dev.sh
```

Or manually:
```bash
cp .env.example .env
docker-compose up -d
```

### Step 3: Access Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **MongoDB**: mongodb://localhost:27017

### Step 4: Verify Services
```bash
# Check all containers running
docker-compose ps

# View logs
docker-compose logs -f

# Test backend
curl http://localhost:5000/api/auth

# Test frontend
curl http://localhost:5173
```

## 📦 Docker Compose Services

| Service | Port | Purpose |
|---------|------|---------|
| MongoDB | 27017 | Database |
| Backend | 5000 | Node.js/Express API |
| Frontend | 5173 | React/Vite web app |
| Redis | 6379 | Cache (optional) |

## 🔧 Common Tasks

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### Stop Services
```bash
docker-compose down
```

### Restart Services
```bash
docker-compose restart
```

### Clean Everything (remove volumes)
```bash
docker-compose down -v
```

### Rebuild Images
```bash
docker-compose build --no-cache
docker-compose up -d
```

### Connect to MongoDB
```bash
# Using MongoDB CLI
mongosh mongodb://admin:SecurePassword123!@localhost:27017/event-db

# Or inside Docker container
docker exec -it event-mongodb mongosh -u admin -p SecurePassword123!
```

### Backend Development
```bash
cd backend
npm install
npm run dev    # Development mode with nodemon
# or
npm start      # Production mode
```

### Frontend Development
```bash
cd frontend
npm install
npm run dev    # Vite dev server
npm run build  # Build for production
npm run lint   # Linting
```

## 📋 Project Structure

```
Event-Registration-Management/
├── backend/               # Node.js Express API
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── Dockerfile
├── frontend/              # React + Vite app
│   ├── src/
│   ├── public/
│   ├── index.html
│   └── Dockerfile
├── terraform-cd/          # Infrastructure as Code
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── user_data.sh
├── ansible/               # Configuration Management
│   ├── playbooks/
│   ├── inventory.ini
│   └── ansible.cfg
├── scripts/               # Helper scripts
│   ├── setup-local-dev.sh
│   └── setup-jenkins-credentials.sh
├── .github/workflows/     # GitHub Actions CI/CD
│   └── cicd.yml
├── Jenkinsfile            # Jenkins pipeline
├── docker-compose.yml     # Local dev & production
└── DEVOPS.md              # Complete DevOps guide
```

## 🌐 Environment Configuration

### Backend Environment Variables
- `PORT`: API server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
- `MONGO_URI`: MongoDB connection string
- `CORS_ORIGIN`: Frontend URL for CORS
- `JWT_SECRET`: Secret key for JWT tokens

### Frontend Environment Variables
- `VITE_API_URL`: Backend API endpoint
- `NODE_ENV`: Environment (development/production)

### MongoDB Credentials
- Username: `admin`
- Password: `SecurePassword123!`
- Database: `event-db`

## 🚀 Deployment Options

### Option 1: Local Docker Compose
```bash
docker-compose up -d
```

### Option 2: GitHub Actions + Jenkins
1. Push to GitHub main/develop branch
2. GitHub Actions runs tests & builds images
3. Jenkins deploys to AWS EC2
4. Ansible configures infrastructure

### Option 3: Manual Terraform + Ansible
```bash
# Provision AWS infrastructure
cd terraform-cd
terraform init
terraform plan
terraform apply

# Configure & deploy to EC2
cd ../ansible
ansible-playbook -i inventory.ini playbooks/provision.yml
ansible-playbook -i inventory.ini playbooks/deploy.yml
```

## 🔍 Troubleshooting

### Services Won't Start
```bash
# Check Docker is running
docker --version

# Check ports are available
netstat -an | grep LISTEN | grep -E ':5000|:5173|:27017'

# View detailed logs
docker-compose logs --tail=50
```

### MongoDB Connection Error
```bash
# Verify MongoDB is running
docker ps | grep mongodb

# Check connection manually
docker exec event-mongodb mongosh -u admin -p SecurePassword123!
```

### Frontend Can't Connect to Backend
```bash
# Check CORS_ORIGIN in .env
cat .env | grep CORS_ORIGIN

# Test API from frontend container
docker exec event-frontend curl http://event-backend:5000/api/auth
```

### Port Already in Use
```bash
# Find process using port
lsof -i :5000

# Change port in docker-compose.yml or .env
# Then restart: docker-compose down && docker-compose up -d
```

## 📚 Additional Resources

- [DEVOPS.md](DEVOPS.md) - Complete DevOps automation guide
- [Jenkinsfile](Jenkinsfile) - Jenkins CI/CD pipeline
- [.github/workflows/cicd.yml](.github/workflows/cicd.yml) - GitHub Actions
- [terraform-cd/](terraform-cd/) - Infrastructure as Code
- [ansible/](ansible/) - Configuration management playbooks

## ✅ Next Steps

1. **Local Development**: Run setup script and start coding
2. **GitHub Setup**: Configure secrets for CI/CD
3. **Jenkins Setup**: Configure Jenkins server and pipeline
4. **AWS Deployment**: Use Terraform to provision infrastructure
5. **Monitoring**: Set up CloudWatch alarms and logs

## 🆘 Need Help?

- Check logs: `docker-compose logs -f`
- Review [DEVOPS.md](DEVOPS.md) for detailed setup
- Check troubleshooting section above
- Create GitHub issue with error details

---

**Happy coding! 🎉**
