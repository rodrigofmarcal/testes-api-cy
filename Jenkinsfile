pipeline {
    agent any

    stages {
        stage('Clonar repositorio') {
            steps {
               git branch 'main', url: 'https://github.com/rodrigofmarcal/teste-ebac-iu.git'
            }
        }
        stage('Instalar dependencias') {
            steps {
               bat 'npm install'  
            }
        }
        stage('Iniciar servidor') {
            steps {
                bat 'npx serverest'
            }

        }
        stage('Executar Testes') {
            steps {
               bat 'NO_COLOR=1 npm run cy:run-ci' 
            }
            
        }
     }
}
