const { getAllLikes } = require("../Models/likesModel")

const getLikes = (req, res) => {
    const data = getAllLikes()
    res.json(data)
}

module.exports = {getLikes}