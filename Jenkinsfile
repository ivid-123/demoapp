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
                    sh 'npm install'
                    sh 'npm run build --prod'
                }
            }
        }
        stage('Store Artifact'){
            steps{
                script{
                    def safeBuildName = "${APPLICATION_NAME}_${BUILD_NUMBER}",
                        artifactFolder = "${ARTIFACT_FOLDER}",
                        fullFileName = "${safeBuildName}.tar.gz",
                        applicationZip = "${artifactFolder}/${fullFileName}"
                    applicationDir = ["src",
                        "dist",
                        "config",
                        "Dockerfile",
                    ].join(" ");
                    def needTargetPath = !fileExists("${artifactFolder}")
                    if (needTargetPath) {
                        sh "mkdir ${artifactFolder}"
                    }
                    sh "tar -czvf ${applicationZip} ${applicationDir}"
                    archiveArtifacts artifacts: "${applicationZip}", excludes: null, onlyIfSuccessful: true
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
                        //sh 'npm run lint'
                    }
                }
                stage('Unit Test'){
                    when {
                        environment name: "EXECUTE_TEST_STAGE", value: "true"
                    }
                    steps{
                        script{
                            echo 'Test Stage - Launching unit tests'
                            //sh 'npm run test --code-coverage'
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
        stage('Configure Build') {
            when {
                expression {
                    openshift.withCluster() {
                        openshift.withProject(DEV_PROJECT) {
                            echo 'selecting template'
                            return !openshift.selector("bc", "${TEMPLATE_NAME}").exists();
                        }
                    }
                }
            }
            steps {
                script {
                    openshift.withCluster() {
                        openshift.withProject(DEV_PROJECT) {
                            /**
                            *   This creates the build configuration in the DEV project
                            *   Creates a entry in Builds as none latest and Images section with empty tag
                            */
                            openshift.newBuild("--name=${TEMPLATE_NAME}", "--docker-image=docker.io/nginx:latest", "--binary=true")
                        }

                    }
                }
            }
        }
        stage('Build Image') {
            steps {
                script {
                    openshift.withCluster() {
                        openshift.withProject(DEV_PROJECT) {
                            /**
                            *   Applies the build configuration ${TEMPLATE_NAME} in DEV_PROJECT to start build
                            *   It produces the image with latest tag and also build that shows the number
                            */
                            openshift.selector("bc", "${TEMPLATE_NAME}").startBuild("--from-archive=${ARTIFACT_FOLDER}/${APPLICATION_NAME}_${BUILD_NUMBER}.tar.gz", "--wait=true")
                        }
                    }
                }
            }
        }
        stage('Deploy to DEV') {
            when {
                expression {
                    openshift.withCluster() {
                        openshift.withProject(DEV_PROJECT) {
                            return !openshift.selector('dc', "${TEMPLATE_NAME}").exists()
                        }
                    }
                }
            }
            steps {
                script {
                    openshift.withCluster() {
                        openshift.withProject(DEV_PROJECT) {
                            /**
                            *   It uses the image create in previous step with latest tag e.g. ${TEMPLATE_NAME}:latest
                            *   It creates the deployment config with the ${TEMPLATE_NAME} in DEV_PROJECT
                            */
                            def app = openshift.newApp("${TEMPLATE_NAME}:latest")
                            app.narrow("svc").expose("--port=${PORT}");
                            def dc = openshift.selector("dc", "${TEMPLATE_NAME}")
                            while (dc.object().spec.replicas != dc.object().status.availableReplicas) {
                                sleep 10
                            }
                        }
                    }
                }
            }
        }
    }
}