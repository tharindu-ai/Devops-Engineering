pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 1, unit: 'HOURS')
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[url: 'https://github.com/tharindu-ai/Devops-Engineering.git']]
                ])
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    echo "Building Backend Docker image..."
                    sh 'docker build -t tharik2000/devops-engineering:backend-v2 -f ./backend/Dockerfile ./backend'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    echo "Building Frontend Docker image..."
                    sh 'docker build -t tharik2000/devops-engineering:frontend-v2 -f ./frontend/Dockerfile ./frontend'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
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
                            docker push tharik2000/devops-engineering:backend-v2
                            docker push tharik2000/devops-engineering:frontend-v2
                            docker logout
                        '''
                    }
                }
            }
        }

        stage('Notify') {
            steps {
                echo "Build completed successfully!"
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo '✅ Pipeline succeeded!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
}
