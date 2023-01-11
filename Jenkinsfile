pipeline {
    agent any

    stages {
        stage('Clonar repositorio') {
            steps {
               git 'https://github.com/rodrigofmarcal/testes-api-cy.git'
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
