const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 5000;
const usersfilepath = path.resolve(__dirname, "users.json")

const server = http.createServer((req, res) => {
    if (req.url == "/users" && req.method == "GET") {
        fs.readFile(usersfilepath, "utf-8", (err, data) => {
            if (err) res.end("error occured in reading file")
            else res.end(data)
        })
    } else if (req.url == "/users" && req.method == "POST") {
        let body = "";
        req.on("data", chunk => body += chunk.toString())
        req.on("end", () => {
            const data = JSON.parse(fs.readFileSync(usersfilepath, "utf-8"))
            const parsedData = JSON.parse(body)
            const id = data.length + 1;
            data.push({ id, ...parsedData })
            // {id : 2, firs_name}
            fs.writeFileSync(usersfilepath, JSON.stringify(data))
            res.end(JSON.stringify(data))
        })
        //"/users/id"
    } else if (req.url.startsWith("/users") && req.method == "PUT") {
        let body = "";
        req.on("data", chunk => body += chunk.toString())
        req.on("end", () => {
            const id = req.url.split("/")[2] // "/users/2" -> ["", "users", "2"]
            const data = JSON.parse(fs.readFileSync(usersfilepath, "utf-8"))
            const matchedIndex = data.findIndex(obj => obj.id == id )
            const parsedObj = JSON.parse(body)
            data[matchedIndex] = {id, ...parsedObj}
            fs.writeFileSync(usersfilepath, JSON.stringify(data))
            res.end(JSON.stringify(data[matchedIndex]))
        })

    } else if (req.url.startsWith("/users") && req.method == "PATCH") {
            let body = "";
            req.on("data", chunk => body += chunk.toString());
            req.on("end", ()=>{
                const id = req.url.split("/")[2]
                const data = JSON.parse(fs.readFileSync(usersfilepath, "utf-8"))
                const matchedIndex = data.findIndex(obj => obj.id == id)
                const parsedObj = JSON.parse(body)
                data[matchedIndex] = {...data[matchedIndex], ...parsedObj}
                fs.writeFileSync(usersfilepath, JSON.stringify(data))
                res.end(JSON.stringify(data[matchedIndex]))
            })
    } else if (req.url == "/users/id" && req.method == "DELETE") {

    }
})
server.listen(PORT, () => {
    console.log(`server is running on port: http://localhost:${PORT}`)
})