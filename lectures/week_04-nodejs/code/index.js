var request = require("request");
var http = require("http");
const PORT = 8888;

/* a function that handles client requests to be used by createServer(). 
req -> request
res -> response
res.end ends the response process.  
*/
function handleReq(req, res){
    if(req.url === '/benny'){
        var benny = {
            name: 'benny',
            age: '22',
            favorite_color: 'blue'
        }
        res.end(JSON.stringify(benny));
    }else if(req.url === '/chirag'){
        var chirag = {
            name: 'chirag',
            age: '22',
            favorite_color: 'green'
        }
        res.end(JSON.stringify(chirag))
    }else{  
        res.end("Link hit: " + req.url);
    }
    console.log("New request at " + req.url);
}

// creates a server
var server = http.createServer(handleReq);


// Instantiates a server that listens on port PORT
server.listen(PORT, function(){
    console.log("Listening on port ", PORT);
})
