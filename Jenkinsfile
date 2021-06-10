pipeline {
    tools {
        nodejs "nodejs"
    }
    agent any
    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Upload to S3 Bucket') {
            steps {
                dir('/var/lib/jenkins/workspace/User-UI/build') {
                    withAWS(region:'us-east-2',credentials:'aws-ecr-creds') {
                        s3Delete(bucket:"stacklunch.com", path:'');
                        s3Upload(bucket:"stacklunch.com", path:'', includePathPattern:'**/*');
                    }   
                } 
            }
        }
    }
    post {
        always {
            sh 'rm -rf build'
        }
    }
}