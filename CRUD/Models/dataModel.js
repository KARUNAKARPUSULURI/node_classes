const path = require("path")
const fs = require("fs")

const dataFilePath = path.join(__dirname, "../Data", "data.json")

const getAllData = () => {
    const data = fs.readFileSync(dataFilePath, "utf-8")
    return JSON.parse(data)
}

const postAllData = (data) => {
    return fs.writeFileSync(dataFilePath, JSON.stringify(data))
}

module.exports = {getAllData, postAllData}