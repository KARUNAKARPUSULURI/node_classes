const express = require("express");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
const dataPath = path.resolve("BCRYPT", "data.json")
const saltRounds = 10;

app.post("/", async (req, res) => {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"))
    const id = data.length + 1
    data.push({ id, username, password: hashedPassword })
    fs.writeFileSync(dataPath, JSON.stringify(data))
    res.json(data)
})
app.post("/login", async (req, res) => {
    const { username, password } = req.body
    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"))
    const hashedPassword = data.find(user => user.username == username)
    if (hashedPassword) {
        const comparedPassword = await bcrypt.compare(password, hashedPassword.password)
        comparedPassword ? res.json(hashedPassword) : res.send("wrong password")
    } else {
        res.send("user not found")
    }
})


app.listen(3000)