const path = require("path")
const fs = require("fs")

const postsModelPath = path.join(__dirname, "../Data", "postsData.json")

const getAllPosts = () => {
    const data = fs.readFileSync(postsModelPath, "utf-8")
    return JSON.parse(data) || []
}

module.exports = {getAllPosts}