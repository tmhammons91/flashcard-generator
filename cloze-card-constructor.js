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
    var stringLowered = this.text.toLowerCase();
    var phraseLowered = this.cloze.toLowerCase();
    if (this.text.search(this.cloze) !== -1) {
        var partial = this.text.replace(this.cloze, '...');
        console.log("The partial text of the Cloze Card is: " + partial);
    } else if (stringLowered.search(phraseLowered) !== -1) {
        var partialLowered = stringLowered.replace(phraseLowered, '...')
        console.log("The partial text of the Cloze Card is: " + partialLowered);
    }
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

module.exports = {
    createCloze: createCloze,
    ClozeCard: ClozeCard
}


