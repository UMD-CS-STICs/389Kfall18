var fs = require("fs");

fs.readFile("input.txt", function(err, data){
    if(err){
        console.error(err);
    }else{
        console.log("Async read: " + data);
    }
})

var data = fs.readFileSync("input.txt");
console.log("Sync read: " + data);