const express = require("express");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL || "";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

const PORT = 3000;
const app = express();
const filePath = path.resolve("Todo", "todo_data.json");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


app.use(express.json());

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

app.get("/todos", (req, res) => {
  const data = readFileData();
  res.json(data);
});

app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  const data = readFileData().find((obj) => obj.id == id);

  if (!data) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.json(data);
});

app.post("/todos", (req, res) => {
  console.log(req.body);
  const newTodo = req.body;
  const data = readFileData();
  const id = data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;

  data.push({ id, ...newTodo });
  writeFileData(data);

  res.status(201).json({ id, ...newTodo });
});

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

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const data = readFileData();

  const todoExists = data.some((obj) => obj.id == id);

  if (!todoExists) {
    return res.status(404).json({ message: "Todo not found" });
  }

  const filteredData = data.filter((obj) => obj.id != id);
  writeFileData(filteredData);

  res.json({ message: "Todo deleted successfully" });
});

app.post("/summarize", async (req, res) => {
  try {
    const todos = readFileData();

    if (todos.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No todos to summarize" });
    }

    const prompt =
      `Summarize the following todo list:\n\n` +
      todos
        .map(
          (todo) =>
            `- ${todo.title} (${todo.status || "no status"}): ${todo.description || "No description"
            }`
        )
        .join("\n") +
      `\n\nProvide a concise summary highlighting the number of todos by status and key tasks.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // or gpt-4-turbo if available
      messages: [{ role: "user", content: prompt }],
    });

    const summaryText = completion.choices[0].message.content;

    if (SLACK_WEBHOOK_URL) {
      await axios.post(SLACK_WEBHOOK_URL, { text: summaryText });
      res.json({
        success: true,
        message: "Summary sent to Slack successfully",
        summary: summaryText,
      });
    } else {
      console.log("Would send to Slack:", summaryText);
      res.json({
        success: true,
        message: "Summary generated (Slack webhook not configured, message not sent)",
        summary: summaryText,
      });
    }
  } catch (error) {
    console.error("Error sending summary to Slack:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send summary to Slack",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
