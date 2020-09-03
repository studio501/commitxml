const fs = require('fs');
var res = require('./settings')
var content = JSON.stringify(res);

fs.writeFile("settings.json", content, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 
