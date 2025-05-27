const express = require("express")
const { getUsers } = require("../Controllers/userController")

const router = express.Router()

router.get("/hello", getUsers)

module.exports = router