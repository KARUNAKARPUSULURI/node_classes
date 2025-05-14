const http = require("http");
const path = require("path")
const fs = require("fs");

const indexFile = path.resolve("HTTP", "index.html")
const usersFile = path.resolve("HTTP", "users.json")
// -> /posts -> [{},{}]
// -> /htmlfile -> 
const PORT = 5000;
const server = http.createServer((req, res) => {
    if (req.url == "/posts") {
        res.end(JSON.stringify([
            { post: "Iphone", price: 3000 },
            { post: "Samsung", price: 3000 }
        ]))
    } else if (req.url == "/htmlFile") {
        fs.readFile(indexFile, "utf-8", (err, data) => {
            if (err) throw new Error("index html file error")
            else res.end(data)
        })
    } else if(req.url == "/users"){
        fs.readFile(usersFile, "utf-8", (err, data)=>{
            if(err) throw new Error("users file error")
                else res.end(data)
        })
    }
})

server.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})


















// const http = require("http")

// const PORT = 3000

// const server = http.createServer((req, res)=>{
//     if(req.url == "/"){
//         res.end("<h1>Go to <a href = 'http://localhost:3000/users'>Users page</a></h1>")
//     }else if(req.url == "/users"){
//         res.end(JSON.stringify({name : "karunakar"}))
//     }
// })

// server.listen(PORT, ()=>{
//     console.log(`server is running on port http://localhost:${PORT}`)
// })





//HTTP(Hyper text transfer protocol) Module :-
// It is inbuilt fundamental module in node js, It is used to create server and handle requests

//1. creating a server -> createServer((req, res)=>{})
//2. listen -> listen(port, ()=> {})   http://localhost:3000