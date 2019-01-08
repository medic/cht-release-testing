# Release Testing With Github

## Creating Test Cases

As functionality is added to the app we should be adding release tests to ensure we haven't regressed. 

* Add a new Issue to the [medic-release-testing](https://github.com/medic/medic-release-testing/issues) repo in github. 
* Add a title that describes what is being tested, on which config, with which type of user.
* For the description add which type of user, the type of config, which platform(desktop, mobile app), the steps to test and the expected result. 
* Close the issue. 
* Add the label `Release Test`


## Generating a Project Board for Testing a Release


Create a personal access token and name it token.json in this directory. 

Run `node create_release_project.js --version <release_vers>` to create a new project versoin. 

EX: `node create_release_project.js --version 3.3.0`

This will generate a project in medic-release-testing repo. Once completed you should see the link to the project in the console. 

EX: Project created at: https://github.com/medic/medic-release-testing/projects/27

## Executing Test Cases

Once the project is created all test cases should be in the TODO column. Drag to the In Progress column while working on them and then to done when it is completed. 