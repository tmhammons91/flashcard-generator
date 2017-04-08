var fs = require("fs");
var inquirer = require("inquirer");

//Basic Flashcard Constructor + Prototypes=========
function BasicCard(front, back) {
    this.front = front;
    this.back = back
};

BasicCard.prototype.printFront = function () {
    console.log(this.front)
};

BasicCard.prototype.printBack = function () {
    console.log(this.back)
};

BasicCard.prototype.printBasic = function () {
    console.log("Front: " + this.front + " Back: " + this.back)
};
//method for BasicCard constructor to store text of basic cards.  Created as placeholder for eventual
//use in tying to front end
BasicCard.prototype.logBasicTxt = function () {
    fs.appendFile("basic.txt", JSON.stringify(this, null, 2), function (err) {
        if (err) {
            console.log(err);
        }
    });
};

//Main process =========================================================
var createBasic = function () {
    inquirer.prompt([
        {
            type: "input",
            name: "basicFront",
            message: "Type in basic card front"
        },
        {
            type: "input",
            name: "basicBack",
            message: "Type in basic card back"
        }
    ]).then(function (data) {
        var newBasicCard = new BasicCard(data.basicFront, data.basicBack);
        newBasicCard.logBasicTxt();
        newBasicCard.printBasic(); 
        //readBasic();
    })
};

//function to read stored basic flashcards--for later use 
var readBasic = function () {
    fs.readFile("basic.txt", "utf8", function (err, data) {
        data = data.split("\n");
        console.log(data)
    })
}

createBasic();

