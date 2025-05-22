//npm install jsonwebtoken -> to generate tokens
//sign -> to generate token
//verify -> to validate or check the generated token

const jwt = require("jsonwebtoken");
const express = require('express')
const app = express()
const port = 3000
const secret_key = "karuna123"
const obj = {
    name: "karunakar",
    age: 20,
    gender: "male"
}
//user -> /register -> token generate -> 
//fetch(url, {headers : {Authorization : Bearer `${token}`}}) -> headers->
//["Bearer", "assdfads.ADFD.asasd"]
//home -> 

const token = jwt.sign(obj, secret_key)

// const str = "name=karuna&age=20"
//["name=karuna", "age=20"]
// //["name", "karuna"]
// str2 = {
//     name : "karunakar",
//     age : 20
// }

// console.log("23", req.url.split("?")[1].split("=")[1])
// const response = req.url.split("=")[1]
// console.log(req.headers.authorization.split(" ")[1])
// res.send(decodedObj


function headers(req, res, next) {
    const receivedToken = req.headers.authorization.split(" ")[1]
    const decodedObj = jwt.verify(receivedToken, secret_key)
    next()
}


// res.send(response)
app.use("/", headers)
// console.log("18", jwt.verify(token, secret_key))
const decoded = jwt.verify(token, secret_key)
// console.log(decoded)

// Header -> metadata //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
// payload -> fe/client // eyJuYW1lIjoia2FydW5ha2FyIiwiYWdlIjoyMCwiZ2VuZGVyIjoibWFsZSIsImlhdCI6MTc0NzkwMzY3OX0.
// signature -> // dXWQHRB5dAWDniQlqbgY8TGgNy6kYzJBst4T4xK08A4

app.get('/posts', headers, (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))