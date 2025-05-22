const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs")

const app = express();
app.use(express.json());
const PORT = 4000;
const filePath = path.resolve("users.json")
const readFileData = () => {
    try {
        const data = fs.readFileSync(filePath, "utf-8")
        return JSON.parse(data) || []
    } catch (err) {
        return err.message
    }
}

const writeFileData = (data) => {
    return fs.writeFileSync(filePath, JSON.stringify(data))
}

function authMiddleware(req, res, next) {
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
        res.send("no token found")
    }
    jwt.verify(token, secret_key, (err, decoded) => {
        if (err) res.send("err")
        else {
            req.user = decoded;
            next();
        }
    })
}

app.use(authMiddleware)

//register
app.post("/register", async (req, res) => {
    const body = req.body
    const data = readFileData()
    const id = data.length + 1
    const password = await bcrypt.hash(body.password, 10)
    data.push({ id, ...body, password })
    writeFileData(data)
    res.json(data)
});

//login
app.post("/login", async (req, res) => {
    const body = req.body;
    const data = readFileData()
    const isUserFound = data.find(user => user.username == body.username)
    if (isUserFound) {
        const hashedPassword = await bcrypt.compare(body.password, isUserFound.password)
        if (hashedPassword) {
            const token = jwt.sign(isUserFound, secret_key)
            res.json({
                message: 'login success',
                data: isUserFound,
                token: token,
                status: 200
            })
        } else {
            res.send("invalid credentials")
        }
    } else {
        res.send("user not found")
    }
});

//home
app.get("/home", authMiddleware, (req, res) => {
    res.send("finally gotcha!")
 });

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})