const express = require("express")
const { getPosts } = require("../Controllers/postController")

const postRouter = express.Router()

postRouter.get("/posts", getPosts)

module.exports = {postRouter}