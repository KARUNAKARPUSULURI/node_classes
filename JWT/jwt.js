const express = require('express')
const jsonwebtoken = require('jsonwebtoken')
const app = express()
const port = 3000

// const secret_key = "karuna123" //login is not defined
// console.log(secret_key)
// "fgskfhgd"
// lofdig
// npm install jsonwebtoken
//const jwt = require("jsonwebtoken")
//2 imp methods -> sign(), verify()
//how to generate a token? using sign()
//how to validate the token ? verify()

//ertyuiolhjgfhjaskldgh.jhADCSVHAJADSCGHksad.SASDFDGDJOPAFSUYHJDSS

const obj = {name : "harish"}
const secret_key = "karuna123"
const token = jsonwebtoken.sign(obj, secret_key)
console.log(token)
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. -> Header -> {alg : "HSA 256", type : "JWT"}
// eyJuYW1lIjoia2FydW5ha2FyIiwiaWF0IjoxNzQ3NzMzNTI4fQ. -> payload
// REYYYd69GhuAuWjwww0XLzXcw2quO4s8r6t2DvryVpc ->signature -> encoded(header, payload, secretkey)
//HEADER.PAYLOAD.SIGNATURE
// ----------------------------
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
// eyJuYW1lIjoiY2hhaXRhbnlhIiwiaWF0IjoxNzQ3NzMzNjQ5fQ.
// s_QVd7aw1G59XOQu_Gyof6yZzFlPeksTflWkm34LcEM


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))