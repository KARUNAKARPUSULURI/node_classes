const express = require('express');
const path = require("path");
const multer = require("multer");
const app = express();
const port = 3000;

const filePath = path.resolve("Uploads")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, filePath)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.fieldname + "." + file.mimetype.split("/")[1])
    }
})

const upload = multer({ storage: storage })

app.post("/login", upload.single("image"), (req, res) => {
    const { username, email, password } = req.body;
    const image = req.file;
    const userData = {
        username,
        email,
        password,
        image
    }
    res.json(userData)
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))