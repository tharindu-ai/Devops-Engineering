pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 2, unit: 'HOURS')
        timestamps()
    }

    environment {
        DOCKER_BACKEND_IMAGE  = "tharik2000/devops-engineering"
        DOCKER_FRONTEND_IMAGE = "tharik2000/devops-engineering-frontend"
        AWS_DEFAULT_REGION    = "ap-south-1"
        TERRAFORM_DIR         = "terraform-cd"
    }

    stages {
        stage('SCM Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[url: 'https://github.com/tharindu-ai/Devops-Engineering.git']]
                ])

                script {
                    env.SHORT_COMMIT = sh(
                        script: 'git rev-parse --short=7 HEAD',
                        returnStdout: true
                    ).trim()
                    echo "Building commit ${env.SHORT_COMMIT}"
                }
            }
        }

        stage('Terraform Deploy to AWS') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'aws-credentials',
                        usernameVariable: 'AWS_ACCESS_KEY_ID',
                        passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                    )
                ]) {
                    dir("${TERRAFORM_DIR}") {
                        sh '''
                            echo "Initializing Terraform..."
                            terraform init
                            
                            echo "Validating Terraform configuration..."
                            terraform validate
                            
                            echo "Planning Terraform deployment..."
                            terraform plan -out=tfplan || true
                            
                            echo "Applying Terraform configuration..."
                            terraform apply -auto-approve tfplan
                        '''
                    }
                }
            }
        }

        stage('Get EC2 IP') {
            steps {
                dir("${TERRAFORM_DIR}") {
                    script {
                        env.SERVER_IP = sh(
                            script: 'terraform output -raw public_ip',
                            returnStdout: true
                        ).trim()
                        echo "✅ EC2 public IP is: ${env.SERVER_IP}"
                    }
                }
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Backend') {
                    steps {
                        echo "Building Backend Docker image..."
                        dir('backend') {
                            sh "docker build --pull=false -t ${DOCKER_BACKEND_IMAGE}:backend-${SHORT_COMMIT} -t ${DOCKER_BACKEND_IMAGE}:backend-latest ."
                        }
                    }
                }

                stage('Frontend') {
                    steps {
                        echo "Building Frontend Docker image with API URL: http://${SERVER_IP}:5000"
                        dir('frontend') {
                            sh '''
                                docker build --pull=false \
                                  --build-arg VITE_API_URL=http://${SERVER_IP}:5000/api \
                                  -t ${DOCKER_FRONTEND_IMAGE}:frontend-${SHORT_COMMIT} \
                                  -t ${DOCKER_FRONTEND_IMAGE}:frontend-latest .
                            '''
                        }
                    }
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                echo "Pushing images to Docker Hub..."
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        
                        echo "Pushing backend images..."
                        docker push ${DOCKER_BACKEND_IMAGE}:backend-${SHORT_COMMIT}
                        docker push ${DOCKER_BACKEND_IMAGE}:backend-latest
                        
                        echo "Pushing frontend images..."
                        docker push ${DOCKER_FRONTEND_IMAGE}:frontend-${SHORT_COMMIT}
                        docker push ${DOCKER_FRONTEND_IMAGE}:frontend-latest
                        
                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    echo "🚀 Deploying to EC2: ${env.SERVER_IP}"
                    
                    withCredentials([
                        sshUserPrivateKey(
                            credentialsId: 'event-registration-key',
                            keyFileVariable: 'SSH_KEY',
                            usernameVariable: 'SSH_USER'
                        )
                    ]) {
                        sh '''
                            chmod 600 $SSH_KEY
                            
                            ssh -o StrictHostKeyChecking=no \
                                -o ConnectTimeout=30 \
                                -o StrictHostKeyChecking=no \
                                -i "$SSH_KEY" \
                                ${SSH_USER}@${SERVER_IP} '
                                
                                echo "Creating app directory..."
                                mkdir -p ~/app
                                cd ~/app
                                
                                echo "Cloning/pulling repository..."
                                if [ ! -d ".git" ]; then
                                    git clone -b main https://github.com/tharindu-ai/Devops-Engineering.git .
                                else
                                    git reset --hard
                                    git pull origin main
                                fi
                                
                                echo "Creating backend environment file..."
                                mkdir -p backend
                                cat > backend/.env << EOF
PORT=5000
MONGO_URI=mongodb://admin:password@mongodb:27017/event-db?authSource=admin
JWT_SECRET=your_very_secure_jwt_secret_key_change_in_production
FRONTEND_URL=http://${SERVER_IP}
EOF
                                
                                echo "Updating docker-compose VITE_API_URL..."
                                sed -i "s|VITE_API_URL: .*|VITE_API_URL: http://${SERVER_IP}:5000/api|g" docker-compose.yml
                                
                                echo "Pulling latest images..."
                                docker compose pull || true
                                
                                echo "Stopping existing containers..."
                                docker compose down || true
                                
                                echo "Starting application with docker compose..."
                                docker compose up -d --build
                                
                                echo "Waiting for services to start..."
                                sleep 30
                                
                                echo "Checking service status..."
                                docker compose ps
                                
                                echo "Cleaning up unused Docker resources..."
                                docker system prune -f
                                
                                echo "✅ Deployment complete!"
                            '
                        '''
                    }
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    echo "🔍 Verifying deployment..."
                    
                    withCredentials([
                        sshUserPrivateKey(
                            credentialsId: 'event-registration-key',
                            keyFileVariable: 'SSH_KEY',
                            usernameVariable: 'SSH_USER'
                        )
                    ]) {
                        sh '''
                            chmod 600 $SSH_KEY
                            
                            ssh -o StrictHostKeyChecking=no \
                                -i "$SSH_KEY" \
                                ${SSH_USER}@${SERVER_IP} '
                                
                                echo "Checking running containers..."
                                docker compose ps
                                
                                echo "Testing backend API..."
                                curl -s http://localhost:5000/api/events | head -20 || echo "API check in progress..."
                                
                                echo -e "\n✅ Application URLs:"
                                echo "Frontend: http://${SERVER_IP}:5173"
                                echo "Backend API: http://${SERVER_IP}:5000/api"
                            '
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo '''
            ✅ ========================================
            ✅ Event Registration App Successfully Deployed!
            ✅ ========================================
            ✅ Frontend: http://${SERVER_IP}:5173
            ✅ Backend API: http://${SERVER_IP}:5000/api
            ✅ ========================================
            '''
        }
        failure {
            echo '''
            ❌ ========================================
            ❌ Pipeline failed. Check logs above.
            ❌ ========================================
            '''
        }
        always {
            echo "Pipeline execution completed."
        }
    }
}
