// packages needed for this app

const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');


//  array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Thank you for using my README generator. To begin, please enter your full name:',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter your name. So you are acknowledged for the work you have done');
                return false;
            }
        }
    },

    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username:',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Linking your GitHub repo will let users know where to find more of your work');
                return false;
            }
        }
    },

    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:',
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log('Add a form of contact so people can ask questions about your project.');
                return false;
            }
        }
    },

    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log('Please enter project title.');
                return false;
            }
        }
    },

    {
        type: 'input',
        name: 'description',
        message: "Enter your project description here:",
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('Please enter a description of the project you are working on.');
                return false;
            }
        }
    },

    {
        type: 'input',
        name: 'installation',
        message: 'What are the instructions for installation?',
        validate: installationInput => {
            if (installationInput) {
                return true;
            } else {
                console.log('Please enter instructions for installation so that users have the proper software needed to run the program.');
                return false;
            }
        }
    },

    {
        type: 'input',
        name: 'usage',
        message: 'Instructions for usage:',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Supply usage instructions so that users can utilize the project.');
                return false;
            }
        }
    },

    {
        type: 'input',
        name: 'contributing',
        message: 'How can others contribute to this project?',
        validate: contributionInput => {
            if (contributionInput) {
                return true;
            } else {
                console.log('Supply instructions on how others can contribute to your project.');
                return false;
            }
        }
    },

    {
        type: 'input',
        name: 'tests',
        message: 'Describe the tests written for your application and how to use them:',
        validate: testsInput => {
            if (testsInput) {
                return true;
            } else {
                console.log('Supply instructions on how others can contribute to your project.');
                return false;
            }
        }
    },

    {
        type: 'confirm',
        name: 'confirmLicenses',
        message: 'Do you want to include a license?',
        default: false
    },

    {
        type: 'list',
        name: 'licenses',
        message: 'What license would you like to include?',
        choices: ['MIT', 'GPL', 'CC--0'],
        when: ({ confirmLicenses }) => {
            if (confirmLicenses) {
                return true;
            } else {
                return false;
            }
        }
    },




];

// writing readme file

const writeToFile = data => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md', data, err => {
            // if error reject promis and send error
            if (err) {
                reject(err);
                return;
            }
            //sending data when parameters are met
            resolve({
                ok: true,
                message: console.log('Success! Navigate to the "dist" folder to see your README!')
            });
        })
    })
}

// TODO: Create a function to initialize app

const init = () => {
    return inquirer.prompt(questions);
}

// Function call to activate app

init()
    .then(userInput => {
        return generateMarkdown(userInput);
    })
    .then(readmeInfo => {
        return writeToFile(readmeInfo);
    })
    .catch(err => {
        console.log(err);
    })
