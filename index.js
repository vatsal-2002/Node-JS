const http = require('http');

const myserver = http.createServer((req,res) => {
    console.log("New req RECc");
    res.end("Hello From Server")
});

myserver.listen(8000, () => console.log("Server Started...!"))