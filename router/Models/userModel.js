const path = require("path")
const fs = require("fs")

const userModelPath = path.join(__dirname, "../Data", "userData.json")

const getAllUsers = () => {
    const data = fs.readFileSync(userModelPath, "utf-8")
    return JSON.parse(data) || []
}

module.exports = {getAllUsers}