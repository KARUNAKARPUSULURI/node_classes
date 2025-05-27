const express = require("express");
const { getUsers } = require("../Controllers/userController");

const userRouter = express.Router();


userRouter.get("/users", getUsers)
userRouter.get("/users/:id", getUsers)
userRouter.post("/users", getUsers)

module.exports = {userRouter}