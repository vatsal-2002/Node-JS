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



app.use(express.urlencoded({extended: false}));

// create middleware
app.use((req,res,next) => {
    console.log("hello Middleware 1");
    next();
});

app.use((req,res,next) => {
    console.log("hello Middleware 2");
    next();
});

// Routes
app.get("/users", (req,res) => {
    const html = 
    `<ul> 
        ${users.map((users) => 
            `<li>${users.first_name}</li>`).join("")}
    </ul>`;
    res.send(html);
})


app.get("/api/users/:id", (req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user)
});
// Rest API
app.get('/api/users', (req,res) => {
   return res.json(users);
})

app.post("/api/users", (req,res) => {
    const body= req.body;
    users.push({...body, id : users.length + 1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users), (err,data) => {
        return res.json({status: "Send data succesfully", id: users.length})
    })
});

app.patch("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const updatedUserData = req.body;

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
        users[userIndex].first_name = updatedUserData.first_name;
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            if (err) {
                return res.status(500).json({ error: "Internal Server Error" });
            }
            return res.json({ status: "User data updated successfully" });
        });
    } else {
        return res.status(404).json({ error: "User not found" });
    }
});

app.delete("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const updatedUsers = users.filter((user) => user.id !== id);

    if (updatedUsers.length < users.length) {
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(updatedUsers), (err, data) => {
            if (err) {
                return res.status(500).json({ error: "Internal Server Error" });
            }
            return res.json({ status: "User deleted successfully" });
        });
    } else {
        return res.status(404).json({ error: "User not found" });
    }
});


const PORT = 8000;
app.listen(PORT, console.log(`Server Started at PORT: ${PORT}`));