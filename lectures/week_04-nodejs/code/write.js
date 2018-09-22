var fs = require("fs");

fs.writeFile('output.txt', 
"This class is great", function(err){
    if(err){
        console.error(err);
    }else{
        fs.readFile('output.txt', function(err, data){
            if(err){
                console.error(err);
            }
            console.log("Inner read:" + data);
        })
    }
})

fs.readFile('output.txt', function(err, data){
    if(err){
        console.error(err);
    }else{
        console.log("Outer read: " + data);
    }

})