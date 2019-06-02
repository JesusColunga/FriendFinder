// apiRoutes.js

// Variables / Load data
// ===============================================================================
var fs = require("fs");
var friends = [];
var path = require("path");
var best = {name:"", photo:"", score:999};

// Functions
// ===============================================================================
function writeLog (strg) {
    fs.appendFile("log.txt", 
                  strg + "\n", 
                  function(err) {
                    if (err) {
                        return console.log("Error writing the log file:", err);
                    };
                  }
                 );
};

// - - - - - - - - - - - - - - 
function calculaScore(friends, ct1){
    var newFren = friends.length - 1;
    var score = 0;
    var log = " = = = = = = = = = =\n";
    log += "New Friend (" + newFren + "): " + friends [newFren].name + "  VS.  ct1=" + ct1 + ": " +  + friends [ct1].name + "\n";
    for (ct2=0; ct2 < friends [ct1].scores.length; ct2++){   // Recorre los scores
        score += Math.abs( parseInt(friends [newFren].scores [ct2]) - parseInt(friends [ct1].scores [ct2]) );
        log += "ct2=" + ct2 + ": " + friends [newFren].scores [ct2] + " - " + friends [ct1].scores [ct2] + " / score= " + score + "\n";
    };
    log += "   score final= " + score + "  /  BestScore= " + best.score + "\n";
    if (score < best.score) {
        best.name  = friends [ct1].name;
        best.photo = friends [ct1].photo;
        best.score = score;
    };
    log += "Best Friend = " + best.name;
    writeLog(log);
};

function buscaMatch(friends){
    var max = friends.length - 1;
    best = {name:"", photo:"", score:999};
    for (ct=0; ct  < max; ct++){calculaScore(friends, ct)};   // Recorre a todos los amigos excepto al nuevo.
    return best;
};

// Execution
// ===============================================================================
fs.readFile("./app/data/friends.js", "utf8", function(error, data) {
    if (error) return console.log("Error reading file 'friends.js':", error);
    friends = JSON.parse(data);
});

// Routing
// ===============================================================================

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        friends.push(req.body);
        fs.writeFile("app/data/friends.js",   
                      JSON.stringify(friends),
                      function(err){
                          if (err) console.log(err)
                          else {
                              console.log("Info appended");
                              res.json( buscaMatch(friends) );
                          }
                      });
    });

};
