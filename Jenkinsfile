pipeline{
    agent any

    stages{
        stage('Setup'){
            sh 'npm install'
        }
        stage('Test'){
            sh 'NO_COLOR=1 npm run cy:run-ci'
        }
     }
}
