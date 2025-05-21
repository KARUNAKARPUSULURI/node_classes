// imports
const express = require("express");
const path = require("path");
const fs = require("fs");

// global declarations
const PORT = 3000;
const app = express();
const filePath = path.resolve("Todo", "todo_data.json");

// middlewares
app.use(express.json());

// file handling functions
const readFileData = () => {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data) || [];
    } catch (err) {
        return [];
    }
};

const writeFileData = (data) => {
    return fs.writeFileSync(filePath, JSON.stringify(data));
};

// routes
// GET all todos
app.get("/todos", (req, res) => {
    const data = readFileData();
    res.json(data);
});

// GET single todo by id
app.get("/todos/:id", (req, res) => {
    const id = req.params.id;
    const data = readFileData().find((obj) => obj.id == id);

    if (!data) {
        return res.status(404).json({ message: "Todo not found" });
    }

    res.json(data);
});

// POST create new todo
app.post("/todos", (req, res) => {
    console.log(req.body)
    const newTodo = req.body;
    const data = readFileData();
    const id = data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;

    data.push({ id, ...newTodo });
    writeFileData(data);

    res.status(201).json({ id, ...newTodo });
});

// PUT update todo (replace)
app.put("/todos/:id", (req, res) => {
    const id = req.params.id;
    const updatedTodo = req.body;
    const data = readFileData();

    const findIndexById = data.findIndex((obj) => obj.id == id);

    if (findIndexById === -1) {
        return res.status(404).json({ message: "Todo not found" });
    }

    data[findIndexById] = { id: parseInt(id), ...updatedTodo };
    writeFileData(data);

    res.json(data[findIndexById]);
});

// PATCH update todo (partial update)
app.patch("/todos/:id", (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    const data = readFileData();

    const findIndexById = data.findIndex((obj) => obj.id == id);

    if (findIndexById === -1) {
        return res.status(404).json({ message: "Todo not found" });
    }

    data[findIndexById] = { ...data[findIndexById], ...updates };
    writeFileData(data);

    res.json(data[findIndexById]);
});

// DELETE todo
app.delete("/todos/:id", (req, res) => {
    const id = req.params.id;
    const data = readFileData();

    const todoExists = data.some(obj => obj.id == id);

    if (!todoExists) {
        return res.status(404).json({ message: "Todo not found" });
    }

    const filteredData = data.filter((obj) => obj.id != id);
    writeFileData(filteredData);

    res.json({ message: "Todo deleted successfully" });
});

// start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});