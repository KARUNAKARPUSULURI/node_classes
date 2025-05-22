import React, { useState } from "react";

const Summarize = () => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSummary = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3000/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        setSummary(data.summary);
      } else {
        setError(data.message || "Failed to get summary");
      }
    } catch (err) {
      setError("Error fetching summary: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Todo Summary</h2>
      <button onClick={fetchSummary} disabled={loading}>
        {loading ? "Loading..." : "Get Summary"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {summary && (
        <pre
          style={{
            whiteSpace: "pre-wrap",
            backgroundColor: "#f0f0f0",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          {summary}
        </pre>
      )}
    </div>
  );
};

export default Summarize;
