const inquirer = require('inquirer');
const fs = require('fs');

inquirer.prompt(
    [
        {
            type: "input",
            name: "title",
            message: "What is the name of your project?"
        },
        {
            type: "input",
            name: "description",
            message:  "Please provide a brief description of your project."
        },
        {
            type: "input",
            name: "installation",
            message:  "What do you need to install in order for your application to work?"
        },
        {
            type: "input",
            name: "usage",
            message:  "How do you use your application?"
        },
        {
            type: "list",
            name: "license",
            message: "What type of license would you like?",
            choices: [
                "Apache License 2.0",
                "GNU GPLv3",
                "MIT",
                "ISC",
                "None"
            ]
        },
        {
            type: "list",
            name: "contributors",
            message: "Would you like other developers to contribute to your project?",
            choices: [
                "Yes",
                "No"
            ]
        },
        {
            type: "input",
            name: "github",
            message:  "What is your GitHub username?"
        },
        {
            type: "input",
            name: "email",
            message:  "What is your email?"
        }
    ]
).then(({title, description, installation, usage, license, contributors, github, email}) => {
    let licInfo = "This project is not covered under a license";
    let showLic = "None";
    let licUrl = "";

    if (license === "Apache License 2.0") {
        licInfo = "This project constructed under the Apache 2.0 license"
        showLic = "Apache 2.0"
        licUrl = "https://www.apache.org/licenses/LICENSE-2.0.txt"
    } else if (license ===  "GNU GPLv3") {
        licInfo = "This project constructed under the GNU GPL v3 license"
        showLic = "GNU GPL v3"
        licUrl = "https://www.gnu.org/licenses/gpl-3.0.en.html"
    } else if (license ===  "MIT") {
        licInfo = "This project constructed under the MIT license"
        showLic = "MIT"
        licUrl = "https://opensource.org/licenses/MIT"
    } else if (license ===  "ISC") {
        licInfo = "This project constructed under the ISC license"
        showLic = "ISC"
        licUrl = "https://opensource.org/licenses/ISC"
    }

    const template = `# ${title} ![License Badge](https://img.shields.io/badge/license-${showLic}-blue.svg)

*[Description](#description)
*[Installation](#installation)
*[Usage](#usage)
*[Tests](#tests)
*[License](#license)
*[Contributors](#contributors)
# Description
${description}
## Installation
${installation}
### Usage
${usage}
## Licenses
${license}
${licUrl}
## Contributors
${contributors}


# Contact
* GitHub: [${github}](https://github.com/${github})
* Email: ${email}
`;

writeToFile(title, template)
}
)

function writeToFile(fileName, data) {
    fs.writeFile(`./${fileName.toLowerCase().split(' ').join('')}.md`, data,(err) => {
        if(err) {
            console.log(err)
        }
        console.log('Your README file has been generated')
    })
}