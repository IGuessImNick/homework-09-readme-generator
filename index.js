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
    let licInfo = "This project is not covered under any license";
    let showLic = "None";
    let licUrl = "";
    let codeOfConduct = "";

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

    if (contributors === "Yes") {
        codeOfConduct = `# Contributor Code of Conduct

        ## Our Pledge
        
        In the interest of fostering an open and welcoming environment, we as
        contributors and maintainers pledge to making participation in our project and
        our community a harassment-free experience for everyone, regardless of age, body
        size, disability, ethnicity, gender identity and expression, level of experience,
        nationality, personal appearance, race, religion, or sexual identity and
        orientation.
        
        ## Our Standards
        
        Examples of behavior that contributes to creating a positive environment
        include:
        
        * Using welcoming and inclusive language
        * Being respectful of differing viewpoints and experiences
        * Gracefully accepting constructive criticism
        * Focusing on what is best for the community
        * Showing empathy towards other community members
        
        Examples of unacceptable behavior by participants include:
        
        * The use of sexualized language or imagery and unwelcome sexual attention or
        advances
        * Trolling, insulting/derogatory comments, and personal or political attacks
        * Public or private harassment
        * Publishing others' private information, such as a physical or electronic
          address, without explicit permission
        * Other conduct which could reasonably be considered inappropriate in a
          professional setting
        
        ## Our Responsibilities
        
        Project maintainers are responsible for clarifying the standards of acceptable
        behavior and are expected to take appropriate and fair corrective action in
        response to any instances of unacceptable behavior.
        
        Project maintainers have the right and responsibility to remove, edit, or
        reject comments, commits, code, wiki edits, issues, and other contributions
        that are not aligned to this Code of Conduct, or to ban temporarily or
        permanently any contributor for other behaviors that they deem inappropriate,
        threatening, offensive, or harmful.
        
        ## Scope
        
        This Code of Conduct applies both within project spaces and in public spaces
        when an individual is representing the project or its community. Examples of
        representing a project or community include using an official project e-mail
        address, posting via an official social media account, or acting as an appointed
        representative at an online or offline event. Representation of a project may be
        further defined and clarified by project maintainers.
        
        ## Enforcement
        
        Instances of abusive, harassing, or otherwise unacceptable behavior may be
        reported by contacting the project maintainer at <ondrej@mirtes.cz>. All
        complaints will be reviewed and investigated and will result in a response that
        is deemed necessary and appropriate to the circumstances. The project team is
        obligated to maintain confidentiality with regard to the reporter of an incident.
        Further details of specific enforcement policies may be posted separately.
        
        Project maintainers who do not follow or enforce the Code of Conduct in good
        faith may face temporary or permanent repercussions as determined by other
        members of the project's leadership.
        
        ## Attribution
        
        This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4,
        available at [http://contributor-covenant.org/version/1/4][version]
        
        [homepage]: http://contributor-covenant.org
        [version]: http://contributor-covenant.org/version/1/4/`
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
${codeOfConduct}


# Contact
* GitHub: [${github}](https://github.com/${github})
* Email: ${email}
`;

writeToFile(title, template)
}
)

function writeToFile(fileName, data) {
    fs.writeFile(`./${fileName.toUpperCase().split(' ').join('')}.md`, data,(err) => {
        if(err) {
            console.log(err)
        }
        console.log('Your README file has been generated')
    })
}