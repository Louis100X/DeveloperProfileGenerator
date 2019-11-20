const inquirer = require("inquirer");
const axios = require("axios");
const generateHTML = require("./generateHTML");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);


const questions = [

];

function writeToFile(fileName, data) {

}

function init() {
    return inquirer.prompt([
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
                "red", "blue", "green", "yellow",
            ]
        }
    ])};

    function gitAPI(response) {
        console.log(response)
        const queryUrl = `https://api.github.com/users/${response.gitHub}`;
        return axios.get(queryUrl).then(function (gitData) {
            console.log(gitData.data);
            gitData.data.color = response.color;
            const hTML = generateHTML(gitData.data);
            console.log(hTML);
            console.log(gitData.data.login);
            console.log(gitData.data.location);
            console.log(gitData.data.blog);
            console.log(gitData.data.html_url);
            console.log(gitData.data.bio);
            console.log(gitData.data.public_repos);
            console.log(gitData.data.followers);
            console.log(gitData.data.following);
        });
    };

init()
.then(function(answers) {
    var response = init();
    gitAPI(response);
  const html = generateHTML(answers);

  return writeFileAsync("index.html", html);
})
.then(function() {
  console.log("Successfully wrote to index.html");
})
.catch(function(err) {
  console.log(err);
});;