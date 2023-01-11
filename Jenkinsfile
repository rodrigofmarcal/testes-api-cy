pipeline {
    agent any

    stages {
        stage('Clonar repositorio') {
            steps {
               git branch 'main', url: 'https://github.com/rodrigofmarcal/testes-api-cy.git'
            }
        }
        stage('Instalar dependencias') {
            steps {
               sh 'npm install'  
            }
        }
        stage('Iniciar servidor') {
            steps {
                sh 'npx serverest'
            }

        }
        stage('Executar Testes') {
            steps {
               sh 'NO_COLOR=1 npm run cy:run-ci' 
            }
            
        }
     }
}
