	node{
        stage('Checkout Project'){
            properties([pipelineTriggers([[$class: 'GitHubPushTrigger']])])
            checkout scm
            git_branch = env.BRANCH_NAME
            git_tag = sh returnStdout: true, script: 'git tag -l --points-at HEAD'
        }

		stage("npm install") {
		    sh 'npm install'
		}
	stage('Test'){
	      parallel (
		"Unit": { 
		    sh "echo Unit"
		},
		"Lint": { 
		    sh "echo Lint"
		},
		"Component": { 
		    sh "echo Component"
		},
	      )
	    }
    
    stage('Build'){
        sh "echo npm Build"
    }
    
}
