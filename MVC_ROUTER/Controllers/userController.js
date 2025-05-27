const { getAllUsers } = require("../Models/userModel");

const getUsers = (req, res) => {
    const data = getAllUsers();
    res.json(data)
}

module.exports = {getUsers}
