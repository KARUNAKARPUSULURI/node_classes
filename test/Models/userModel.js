const fs = require("fs")
const path = require("path")

const filepath = path.join(__dirname, "userData.json")

function getAllUsers(){
    const data = fs.readFileSync(filepath)
    return JSON.parse(data) || []
}

module.exports = {getAllUsers}