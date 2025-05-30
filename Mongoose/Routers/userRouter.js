const express = require("express");
const { addUser, getAllUsers, deleteUser, updateUser } = require("../Controllers/userController");

const userRouter = express.Router();

userRouter.get("/", getAllUsers)
userRouter.post("/", addUser)
userRouter.delete("/:id", deleteUser)
userRouter.put("/:id", updateUser)


module.exports = {userRouter}