const path = require("path")
const fs = require("fs")

const likesModelPath = path.join(__dirname, "../Data", "likesData.json")

const getAllLikes = () => {
    const data = fs.readFileSync(likesModelPath, "utf-8")
    return JSON.parse(data) || []
}

module.exports = {getAllLikes}