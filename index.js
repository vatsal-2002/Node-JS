// const http = require('http');

// const myserver = http.createServer((req,res) => {
//     console.log("New req RECc");
//     res.end("Hello From Server")
// });

// myserver.listen(8000, () => console.log("Server Started...!"))

const express = require('express');
const fs = require('fs');
const users =require('./MOCK_DATA.json')
const app = express();

// Routes
app.get("/users", (req,res) => {
    const html = 
    `<ul> 
        ${users.map((users) => 
            `<li>${users.first_name}</li>`).join("")}
    </ul>`;
    res.send(html);
})

// Rest API
app.get('/api/users', (req,res) => {
    res.json(users);
})

app.get("/api/users/:id", (req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user)
});

app.use(express.urlencoded({extended: false}));
app.post("/api/users", (req,res) => {
    const body= req.body;
    users.push({...body, id : users.length + 1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users), (err,data) => {
        return res.json({status: "Send data succesfully"})
    })
});


const PORT = 8000;
app.listen(PORT, console.log(`Server Started at PORT: ${PORT}`));