const inquirer = require("inquirer");
const axios = require("axios");
const generateHTML = require("./generateHTML");

const questions = [

];

function writeToFile(fileName, data) {

}

function init() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "gitHub",
                message: "What is your gitHub Username",

            },
            {
                type: "list",
                name: "color",
                message: "What is your favorite color?",
                choices: [
                    "red", "blue", "green"
                ]
            }
        ]).then(function (response) {
            console.log(response)
            const queryUrl = `https://api.github.com/users/${response.gitHub}`;
            axios.get(queryUrl).then(function(gitData){
                console.log(gitData.data);
                gitData.data.color = response.color;
                const hTML = generateHTML(gitData.data);
                console.log(hTML);
            })
        });
}

init();