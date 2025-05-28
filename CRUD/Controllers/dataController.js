const { getAllData, postAllData } = require("../Models/dataModel")

const getData = (req, res) => {
    const data = getAllData() //[{}]
    res.json(data)
}

const postData = (req, res) => {
    const newData = req.body
    const data = getAllData() 
    const id = data.length + 1
    data.push({id, ...newData})
    postAllData(data)
    res.json({
        message : "successfully added data",
        data : data,
        status : 201
    })
}

const updateData = (req, res) => {
    const newData = req.body;
    const {id} = req.params //2
    const data = getAllData() //[{1},{2}]
    const matchedIndex = data.findIndex(obj => obj.id == id)
    data[matchedIndex] = {id, ...newData}
    postAllData(data)
    res.json(data)
}

const deleteData = (req, res) => {
    const {id} = req.params;
    const data = getAllData()
    const filteredData = data.filter(obj => obj.id != id)
    postAllData(filteredData)
    res.json(filteredData)
}

module.exports = {getData, postData, updateData, deleteData}