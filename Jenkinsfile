pipeline {
    agent {
        node {
            label 'nodejs'
        }
    }
    environment {
        SPA_NAME = "video-tool"
        EXECUTE_VALIDATION_STAGE = "true"
        EXECUTE_VALID_PRETTIER_STAGE = "true"
        EXECUTE_VALID_TSLINT_STAGE = "true"
        EXECUTE_TEST_STAGE = "true"
        EXECUTE_TAG_STAGE = "true"
        EXECUTE_BUILD_STAGE = "true"

        APPLICATION_NAME = 'video-tool-app'
        // GIT_REPO = "https://github.com/ivid-123/demoapp.git"
        // GIT_BRANCH = "master"
        STAGE_TAG = "promoteToQA"
        DEV_TAG = "1.0"
        DEV_PROJECT = "dev"
        STAGE_PROJECT = "stage"
        TEMPLATE_NAME = "video-tool-template"
        ARTIFACT_FOLDER = "target"
        PORT = 8080;
        MAIL_TO = 'ashish.mishra2@soprasteria.com,arvind.singh@soprasteria.com,pallav.narang@soprasteria.com,jenkinstestuser01@gmail.com'
        // astha.bansal@soprasteria.com
    }

    stages {
        stage('Build & Package') {
            steps {
                script {
                    echo 'Tags build : ${env.TAG_NAME}'
                    sh 'npm install'
                    sh 'npm run build --prod'
                }
            }
        }
        stage('Validation'){
            when {
                environment name: "EXECUTE_VALIDATION_STAGE", value: "true"
            }

            failFast true
            parallel {
                // stage('Prettier'){
                //     when {
                //         environment name: "EXECUTE_VALID_PRETTIER_STAGE", value: "true"
                //     }
                //     steps{
                //         echo 'Validation Stage - prettier'
                //         //sh 'npm run prettier:check'
                //     }
                // }
                stage('Lint'){
                    when {
                        environment name: "EXECUTE_VALID_TSLINT_STAGE", value: "true"
                    }
                    steps{
                        echo 'Valildation Stage - tslint'
                        sh 'npm run lint'
                    }
                }
                stage('Unit Test'){
                    when {
                        environment name: "EXECUTE_TEST_STAGE", value: "true"
                    }
                    steps{
                        script{
                            echo 'Test Stage - Launching unit tests'
                            sh 'npm run test --code-coverage'
                        }
                    }
                }
            }
        }
        // stage('Quality Analysis') {
        //     steps {
        //         script {
        //             sh 'npm run sonar'
        //         }
        //     }
        // }
        // stage('Quality Gates') {
        //     environment {
        //         scannerHome = tool 'sonarqube-scanner'
        //     }
        //     steps {
        //         withSonarQubeEnv('sonarqube') {
        //             sh "${scannerHome}/bin/sonar-scanner"
        //         }
        //         timeout(time: 10, unit: 'MINUTES') {
        //             waitForQualityGate abortPipeline: true
        //         }
        //     }
        // }
    }
}