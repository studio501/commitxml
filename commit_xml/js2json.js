const fs = require('fs');
a = require('./settings')
var content = JSON.stringify(a.a)

fs.writeFile("a.json", content, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 
