var fs = require("fs");
var inquirer = require("inquirer");
var basicCard = require("./basic-card-constructor");
var clozeCard = require("./cloze-card-constructor");

var chooseCard = function () {
    inquirer.prompt([
        {
            type: "list",
            name: "startConstructor",
            message: "What kind of flashcard would you like to create?",
            choices: ["BASIC", "CLOZE"]
        }
    ]).then(function (data) {
        if (data.startConstructor.toUpperCase() === "BASIC") {
            basicCard.createBasic();
        } else {
            clozeCard.createCloze();
        }

    })
};

chooseCard(); 
