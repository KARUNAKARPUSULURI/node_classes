const express = require('express')
const multer = require("multer")
const app = express()
const port = 7000
const path = require("path")
const filePath = path.resolve("Multer", "files")
console.log(filePath)
//karunakar P

//Chatgpt image - 171291293812-419628272

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, filePath)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
        const type = file.mimetype.split("/")[1]
        cb(null, file.fieldname + "-" + uniqueSuffix + "." + type)
    }
})

const upload = multer({ storage: storage });

app.get('/', (req, res) => res.send('Hello World!'));

app.post("/files", upload.array("hello", 3), (req, res) => {
    res.send(req.files)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))