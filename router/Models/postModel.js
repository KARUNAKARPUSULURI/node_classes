const path = require("path")
const fs = require("fs")

const postModelPath = path.join(__dirname, "../Data", "postData.json")

const getAllPosts = () => {
    const data = fs.readFileSync(postModelPath, "utf-8")
    return JSON.parse(data) || []
}

module.exports = {getAllPosts}