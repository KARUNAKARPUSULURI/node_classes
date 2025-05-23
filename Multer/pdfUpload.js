const multer = require("multer")
const express = require("express")
const path = require("path")


const app = express();

const PORT = 5000;

const filePath = path.resolve("Multer", "files")

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, filePath)
    },
    filename : function(req, file, cb){
        cb(null, Date.now + file.fieldname + "." + file.mimetype.split("/")[1])
    }
})

const fileUploads = multer({storage : storage})


app.post("/uploads", fileUploads.single("pdf"), (req, res)=>{
    res.send(req.file)
})

app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})