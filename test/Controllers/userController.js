const {getAllUsers} = require("../Models/userModel")
console.log(getAllUsers)


const getUsers = (req, res) => {
    const data = getAllUsers()
    res.send(data)
}

module.exports = {getUsers}