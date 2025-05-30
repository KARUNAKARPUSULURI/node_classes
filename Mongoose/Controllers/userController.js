const User = require("../Models/userModel")

const getAllUsers = async(req, res) => {
    const data = await User.find()
    res.json(data)
}

const addUser = async (req, res) => {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser)
}

const updateUser = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body)
    res.json(updatedUser)
}

const deleteUser = async(req, res) => {
    console.log(req.params.id)
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    res.json(deletedUser)
}



module.exports = {getAllUsers, addUser, deleteUser, updateUser}