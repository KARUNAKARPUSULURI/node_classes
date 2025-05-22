const express = require("express");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL || "";
// Option 1: Hugging Face (free tier with rate limits but more generous)
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY || "";
// Option 2: Groq (very fast and generous free tier)
const GROQ_API_KEY = process.env.GROQ_API_KEY || "";

const PORT = 3000;
const app = express();
const filePath = path.resolve("todo_data.json");

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

// Option 1: Hugging Face API function
const summarizeWithHuggingFace = async (prompt) => {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
      {
        inputs: prompt,
        parameters: {
          max_length: 200,
          min_length: 50,
          do_sample: false
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data[0]?.summary_text || response.data[0]?.generated_text || "Summary generated successfully";
  } catch (error) {
    console.error('Hugging Face API error:', error.response?.data || error.message);
    throw error;
  }
};

// Option 2: Groq API function (very generous free tier)
const summarizeWithGroq = async (prompt) => {
  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        model: "llama3-8b-8192", // Free model
        temperature: 0.1,
        max_tokens: 300
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Groq API error:', error.response?.data || error.message);
    throw error;
  }
};

// Option 3: Ollama (completely free, runs locally)
const summarizeWithOllama = async (prompt) => {
  try {
    const response = await axios.post(
      'http://localhost:11434/api/generate',
      { 
        model: "llama2", // or "mistral", "codellama", etc.
        prompt: prompt,
        stream: false
      }
    );
    return response.data.response;
  } catch (error) {
    console.error('Ollama API error:', error.message);
    throw error;
  }
};

// Option 4: Simple rule-based summarizer (no API needed)
const createSimpleSummary = (todos) => {
  const statusCounts = {};
  const priorities = { high: 0, medium: 0, low: 0 };
  
  todos.forEach(todo => {
    // Count by status
    const status = todo.status || 'no status';
    statusCounts[status] = (statusCounts[status] || 0) + 1;
    
    // Count by priority if exists
    if (todo.priority && priorities.hasOwnProperty(todo.priority.toLowerCase())) {
      priorities[todo.priority.toLowerCase()]++;
    }
  });
  
  let summary = `📋 Todo Summary (${todos.length} total items):\n\n`;
  
  // Status breakdown
  summary += "Status Breakdown:\n";
  Object.entries(statusCounts).forEach(([status, count]) => {
    summary += `• ${status}: ${count} items\n`;
  });
  
  // Priority breakdown (if any todos have priorities)
  const totalPriorities = Object.values(priorities).reduce((a, b) => a + b, 0);
  if (totalPriorities > 0) {
    summary += "\nPriority Breakdown:\n";
    Object.entries(priorities).forEach(([priority, count]) => {
      if (count > 0) summary += `• ${priority}: ${count} items\n`;
    });
  }
  
  // Recent todos
  const recentTodos = todos.slice(-3);
  if (recentTodos.length > 0) {
    summary += "\nRecent Items:\n";
    recentTodos.forEach(todo => {
      summary += `• ${todo.title} (${todo.status || 'no status'})\n`;
    });
  }
  
  return summary;
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

    let summaryText;

    // Try different summarization methods in order of preference
    try {
      // Option 1: Try Groq first (most reliable free option)
      if (GROQ_API_KEY && GROQ_API_KEY.trim() !== "") {
        const prompt = `Summarize the following todo list:\n\n` +
          todos
            .map(
              (todo) =>
                `- ${todo.title} (${todo.status || "no status"}): ${todo.description || "No description"}`
            )
            .join("\n") +
          `\n\nProvide a concise summary highlighting the number of todos by status and key tasks.`;

        summaryText = await summarizeWithGroq(prompt);
      }
      // Option 2: Try Hugging Face
      else if (HUGGINGFACE_API_KEY && HUGGINGFACE_API_KEY.trim() !== "") {
        const prompt = todos
          .map(todo => `${todo.title}: ${todo.description || "No description"} (${todo.status || "no status"})`)
          .join(". ");

        summaryText = await summarizeWithHuggingFace(prompt);
      }
      // Option 3: Try Ollama (if running locally)
      else {
        try {
          const prompt = `Summarize the following todo list:\n\n` +
            todos
              .map(
                (todo) =>
                  `- ${todo.title} (${todo.status || "no status"}): ${todo.description || "No description"}`
              )
              .join("\n") +
            `\n\nProvide a concise summary highlighting the number of todos by status and key tasks.`;

          summaryText = await summarizeWithOllama(prompt);
        } catch (ollamaError) {
          // Fallback to simple summary if Ollama isn't available
          summaryText = createSimpleSummary(todos);
        }
      }
    } catch (apiError) {
      console.log("API summarization failed, using simple summary:", apiError.message);
      // Fallback to simple rule-based summary
      summaryText = createSimpleSummary(todos);
    }

    // Send to Slack if configured and valid URL
    if (SLACK_WEBHOOK_URL && SLACK_WEBHOOK_URL.trim() !== "") {
      try {
        await axios.post(SLACK_WEBHOOK_URL, { text: summaryText });
        res.json({
          success: true,
          message: "Summary sent to Slack successfully",
          summary: summaryText,
        });
      } catch (slackError) {
        console.error("Slack webhook error:", slackError.message);
        res.status(500).json({
          success: false,
          message: "Failed to send summary to Slack",
          error: slackError.message,
        });
        return;
      }
    } else {
      console.log("Would send to Slack:", summaryText);
      res.json({
        success: true,
        message: "Summary generated successfully",
        summary: summaryText,
      });
    }
  } catch (error) {
    console.error("Error generating summary:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate summary",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Available summarization methods:`);
  console.log(`- Groq API: ${GROQ_API_KEY ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`- Hugging Face: ${HUGGINGFACE_API_KEY ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`- Ollama: Check if running on localhost:11434`);
  console.log(`- Simple Summary: ✅ Always available as fallback`);
});