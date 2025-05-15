//imports
const http = require("http");
const path = require("path");
const fs = require("fs");

//global delcartions
const PORT = 3000;
const filePath = path.resolve("CRUD_NODE", "train_data.json")

//file handlings
const readfileData = () => {
    try {
        const data = fs.readFileSync(filePath, "utf-8")
        return JSON.parse(data) || [];
    } catch (err) {
        return []
    }
}

const writeFileData = (data) => {
    return fs.writeFileSync(filePath, JSON.stringify(data))
}

const getIdFromUrl = (req) => {
    const id = req.url.split("/")[2]
    return id;
}
// -> "/users/id"
//server creation or services
const server = http.createServer((req, res) => {
    const url = req.url.startsWith("/trains")
    if (req.url == "/trains" && req.method == "GET") {
        const data = readfileData()
        res.end(JSON.stringify(data))
    } else if (req.url.startsWith("/trains") && req.method == "GET") {
        const id = getIdFromUrl(req);
        const data = readfileData().find(obj => obj.id == id)
        res.end(JSON.stringify(data))
    } else if (req.url == "/trains" && req.method == "POST") {
        let body = ""
        req.on("data", (chunk) => body += chunk.toString())
        req.on("end", () => {
            console.log(body)
            const parsedData = JSON.parse(body)
            const data = readfileData();
            const id = data.length + 1
            data.push({ id, ...parsedData })
            writeFileData(data)
            res.end(JSON.stringify(data))
        })
    } else if (url && req.method == "PUT") {
        let body = "";
        req.on("data", chunk => body += chunk.toString())
        req.on("end", () => {
            const id = getIdFromUrl(req)
            const data = readfileData()
            const parsedData = JSON.parse(body)
            const findIndexById = data.findIndex(obj => obj.id == id) //0
            data[findIndexById] = { id, ...parsedData }
            writeFileData(data)
            res.end(JSON.stringify(data[findIndexById]))
        })
    } else if (url && req.method == "PATCH") {
        let body = "";
        req.on("data", chunk => body += chunk.toString())
        req.on("end", () => {
            const id = getIdFromUrl(req)
            const data = readfileData()
            const parsedData = JSON.parse(body)
            const findIndexById = data.findIndex(obj => obj.id == id) //0
            data[findIndexById] = { ...data[findIndexById], ...parsedData }
            writeFileData(data)
            res.end(JSON.stringify(data[findIndexById]))
        })
    } else if (url && req.method == "DELETE") {
        const id = getIdFromUrl(req);
        const data = readfileData();
        const filteredData = data.filter(obj => obj.id != id)
        writeFileData(filteredData)
        res.end(JSON.stringify(filteredData))
    }
})

server.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})