pipeline {
    agent any

    environment {
        DOCKERHUB_CREDS = credentials('dockerhub-credentials')
        IMAGE            = "${DOCKERHUB_CREDS_USR}/eduplaty-frontend"
        KUBECONFIG_FILE  = credentials('kubeconfig')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install & Build') {
            steps {
                sh 'npm ci'
                sh 'npm run build'
            }
        }

        stage('Docker Build & Push') {
            steps {
                sh """
                    echo ${DOCKERHUB_CREDS_PSW} | docker login -u ${DOCKERHUB_CREDS_USR} --password-stdin
                    docker build -t ${IMAGE}:${BUILD_NUMBER} -t ${IMAGE}:latest .
                    docker push ${IMAGE}:${BUILD_NUMBER}
                    docker push ${IMAGE}:latest
                """
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    sh """
                        kubectl set image deployment/eduplaty-frontend \
                            eduplaty-frontend=${IMAGE}:${BUILD_NUMBER} \
                            -n eduplaty
                        kubectl rollout status deployment/eduplaty-frontend -n eduplaty --timeout=120s
                    """
                }
            }
        }
    }

    post {
        success { echo "Frontend deployed — build #${BUILD_NUMBER}" }
        failure { echo "Frontend pipeline failed" }
        always  { sh 'docker logout || true' }
    }
}
