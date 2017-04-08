var fs = require("fs");
var inquirer = require("inquirer");

function ClozeCard(text, cloze) {
    this.text = text;
    this.cloze = cloze
};

//creating a function to store the flashcards so they can eventually be used in a front end app
ClozeCard.prototype.logClozeTxt = function () {
    fs.appendFile("cloze.txt", JSON.stringify(this, null, 2), function (err) {
        if (err) {
            console.log(err);
        }
    });
};
//Creating a readCloze to use eventually with a front end interface to use the flashcards
ClozeCard.prototype.readCloze = function () {
    fs.readFile("cloze.txt", "utf8", function (err, data) {
        data = data.split("\n");
        console.log(data)
    }) 
};

ClozeCard.prototype.showFull = function () {
    console.log("The full Cloze Card text is: " + this.text);
};

ClozeCard.prototype.showCloze = function () {
    console.log("The cloze phrase is: " + this.cloze)
};

ClozeCard.prototype.showPartial = function () {
    var string = this.text.toLowerCase(); 
    var phrase = this.cloze.toLowerCase();
    var partial = string.replace(phrase, '...');
    console.log("The partial text of the Cloze Card is: " + partial);
}

//Main Process ============================
var createCloze = function () {
    inquirer.prompt([
        {
            type: "input",
            name: "clozeText",
            message: "Type in the full text of the cloze flashcard"
        },
        {
            type: "input",
            name: "clozePhrase",
            message: "Type in the cloze portion"
        }
    ]).then(function (data) {
        var string = data.clozeText.toLowerCase();
        var phrase = data.clozePhrase.toLowerCase();
        var n = string.search(phrase);
        if (n === -1) {
            console.log("This doesn't work.  That cloze phrase is not in your text.");
            return;
        } else {
            var newClozeCard = new ClozeCard(data.clozeText, data.clozePhrase);
            newClozeCard.logClozeTxt();
            newClozeCard.showFull();
            newClozeCard.showPartial();
            newClozeCard.showCloze()
            //newClozeCard.readCloze();
        };
    })
};

createCloze();


