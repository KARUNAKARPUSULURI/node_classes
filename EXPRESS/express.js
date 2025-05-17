const express = require("express");
const fs = require("fs");
const path = require("path")

const app = express(); //intializing an instance
app.use(express.json()) //using middleware for getting data

const PORT = 4000; //port for my localhost
const filePath = path.resolve("EXPRESS", "users.json"); //getting file 
const postsFile = path.resolve("EXPRESS", "posts.json")
const readFileData = () => {
    try{
        const data = fs.readFileSync(filePath, "utf-8")
        return JSON.parse(data) || [] 
    }catch(err){
        return err.message 
    }
}
const readposts = () => {
    try{
        const data = fs.readFileSync(postsFile, "utf-8")
        return JSON.parse(data) || [] 
    }catch(err){
        return err.message 
    }
}

const writeFileData = (data) => {
    return fs.writeFileSync(filePath, JSON.stringify(data))
}

//service for getting users
app.get("/users", (req, res)=>{
    res.json(readFileData())
})

app.delete("/users/:id", (req, res) => {
    const id = req.params.id //{id : 1234567654321}
    const data = readFileData();
    const filteredUsers = data.filter(user => user.id != id)
    writeFileData(filteredUsers)
    res.json(filteredUsers)
});
//service for creating users
app.post("/register", (req, res) => {
    const body = req.body;
    const data = readFileData()
    data.push({id : Date.now(), ...body})
    writeFileData(data)
    res.json(data)
})

app.post("/login", (req, res) => {
    const body = req.body;
    const data = readFileData();
    const matchedUser = data.find(user => user.username == body.username && user.password == body.password);
    matchedUser ? 
    res.json({message : "Successfully logged in", data : matchedUser, status : "OK"}) :  res.send("User not found")
})

app.get("/posts", (req, res) => {
    res.json(readposts())
})

app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})