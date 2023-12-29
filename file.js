const fs = require('fs');

// write file using sync...
fs.writeFileSync('./test.txt', 'Hello Sync...');

// writee File using async...
fs.writeFile('./test.txt', 'hello Async...', (err) => {})

// Read File Using Sync...
const result = fs.readFileSync("./read.txt","utf-8");
console.log(result);

// read File Usign Async...
fs.readFile("./read.txt","utf-8", (err,result) => {
    if (err) {
        console.log("ERROR", err);
    }else{
        console.log(result);
    }
})

// Append
fs.appendFileSync("./test.txt", `${Date.now()} hello\n`);

// copy file
fs.cpSync('test.txt','copy.txt');

// delete file
fs.unlinkSync('./copy.txt')

// URL Module
var url = require('url');
var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var q = url.parse(adr, true);

console.log(q.host); 
console.log(q.pathname); 
console.log(q.search); 

var qdata = q.query; 
console.log(qdata.month); 

// Event
var events = require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.on('scream', function() {
console.log('A scream is detected!');
});
eventEmitter.emit('scream');