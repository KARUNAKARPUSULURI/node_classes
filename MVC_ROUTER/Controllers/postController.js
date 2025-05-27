const { getAllPosts } = require("../Models/postModel");

const getPosts = (req, res) => {
    const data = getAllPosts()
    res.json(data)
}

module.exports = {getPosts}
