const inquirer = require("inquirer");
const axios = require("axios");
const generateHTML = require("./generateHTML");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);


var pdf = require('html-pdf');
// var html = fs.readFileSync('./index.html', 'utf8');
// var options = { format: 'Letter' };

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
    ]).then(function (response) {
        console.log(response)
        const queryUrl = `https://api.github.com/users/${response.gitHub}`;
        return axios.get(queryUrl).then(function (gitData) {
            console.log(gitData.data);
            const hTML = generateHTML(response , gitData);
            return writeFileAsync("index.html", hTML);
        })
        .then(function () {
            var html = fs.readFileSync('./index.html', 'UTF-8');
            var options = { format: 'Letter' };
            return pdf.create(html, options).toFile('./index.pdf', function (err, res) {
                if (err)
                    return console.log(err);
                console.log(res); 
            })
        })
        .then(function () {
            console.log("Successfully wrote to index.html");
        })
        .catch(function (err) {
            console.log(err);
        });



        
    });
}



init();