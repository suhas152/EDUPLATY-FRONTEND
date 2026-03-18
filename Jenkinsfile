pipeline {
    agent any

    environment {
        DOCKERHUB_CREDS = credentials('dockerhub-credentials')
        IMAGE            = "${DOCKERHUB_CREDS_USR}/eduplaty-frontend"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install & Build') {
            steps {
                bat 'npm ci'
                bat 'npm run build'
            }
        }

        stage('Docker Build & Push') {
            steps {
                bat "docker login -u %DOCKERHUB_CREDS_USR% -p %DOCKERHUB_CREDS_PSW%"
                bat "docker build -t %IMAGE%:%BUILD_NUMBER% -t %IMAGE%:latest ."
                bat "docker push %IMAGE%:%BUILD_NUMBER%"
                bat "docker push %IMAGE%:latest"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    bat "kubectl set image deployment/eduplaty-frontend eduplaty-frontend=%IMAGE%:%BUILD_NUMBER% -n eduplaty"
                    bat "kubectl rollout status deployment/eduplaty-frontend -n eduplaty --timeout=120s"
                }
            }
        }
    }

    post {
        success {
            echo "Frontend deployed successfully — build #${BUILD_NUMBER}"
        }
        failure {
            echo "Frontend pipeline failed — check logs above"
        }
    }
}
