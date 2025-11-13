pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/tharindu-ai/Devops-Engineering.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t tharik2000/devops-engineering:backend-v2 ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t tharik2000/devops-engineering:frontend-v2 ./frontend'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'doker_engineering', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                      echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                      docker push tharik2000/devops-engineering:backend-v2
                      docker push tharik2000/devops-engineering:frontend-v2
                    '''
                }
            }
        }
    }
}
