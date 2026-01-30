#!/bin/bash

# Local Development Setup Script
# Initializes local development environment with Docker Compose

set -e

echo "=========================================="
echo "Event Registration - Local Dev Setup"
echo "=========================================="

# Check prerequisites
check_requirements() {
    echo "Checking requirements..."
    
    if ! command -v docker &> /dev/null; then
        echo "❌ Docker is not installed. Please install Docker."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        echo "❌ Docker Compose is not installed. Please install Docker Compose."
        exit 1
    fi
    
    if ! command -v git &> /dev/null; then
        echo "❌ Git is not installed. Please install Git."
        exit 1
    fi
    
    echo "✅ All prerequisites satisfied"
}

# Create environment file
setup_env() {
    echo ""
    echo "Setting up environment variables..."
    
    if [ -f .env ]; then
        echo "⚠️  .env file already exists. Skipping creation."
    else
        cat > .env <<EOF
# MongoDB
MONGO_ROOT_USER=admin
MONGO_ROOT_PASSWORD=SecurePassword123!
MONGO_INITDB_DATABASE=event-db

# Backend
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://admin:SecurePassword123!@mongodb:27017/event-db?authSource=admin
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Frontend
VITE_API_URL=http://localhost:5000
EOF
        echo "✅ .env file created"
    fi
}

# Build images
build_images() {
    echo ""
    echo "Building Docker images..."
    
    docker-compose build
    
    echo "✅ Docker images built successfully"
}

# Start services
start_services() {
    echo ""
    echo "Starting services with Docker Compose..."
    
    docker-compose up -d
    
    echo "✅ Services started successfully"
}

# Wait for services to be ready
wait_for_services() {
    echo ""
    echo "Waiting for services to be ready..."
    
    sleep 5
    
    for i in {1..30}; do
        if curl -s http://localhost:5000/api/auth > /dev/null 2>&1; then
            echo "✅ Backend is ready"
            break
        fi
        if [ $i -eq 30 ]; then
            echo "⚠️  Backend took too long to start. Check logs with: docker-compose logs backend"
        fi
        echo "⏳ Waiting for backend... ($i/30)"
        sleep 1
    done
    
    sleep 2
    
    for i in {1..30}; do
        if curl -s http://localhost:5173 > /dev/null 2>&1; then
            echo "✅ Frontend is ready"
            break
        fi
        if [ $i -eq 30 ]; then
            echo "⚠️  Frontend took too long to start. Check logs with: docker-compose logs frontend"
        fi
        echo "⏳ Waiting for frontend... ($i/30)"
        sleep 1
    done
}

# Display startup information
display_info() {
    echo ""
    echo "=========================================="
    echo "✅ Local development setup complete!"
    echo "=========================================="
    echo ""
    echo "📌 Access the application:"
    echo "   Frontend: http://localhost:5173"
    echo "   Backend:  http://localhost:5000"
    echo "   MongoDB:  mongodb://localhost:27017"
    echo ""
    echo "📌 Useful commands:"
    echo "   View logs:     docker-compose logs -f"
    echo "   View specific: docker-compose logs -f backend"
    echo "   Stop services: docker-compose down"
    echo "   Restart:       docker-compose restart"
    echo "   Clean volumes: docker-compose down -v"
    echo ""
    echo "📌 Default credentials:"
    echo "   MongoDB User: admin"
    echo "   MongoDB Pass: SecurePassword123!"
    echo ""
}

# Main execution
main() {
    check_requirements
    setup_env
    build_images
    start_services
    wait_for_services
    display_info
}

# Run main function
main
