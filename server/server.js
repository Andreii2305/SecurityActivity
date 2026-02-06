const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve your root folder (so index.html + style folder works)
app.use(express.static(path.join(__dirname, "..")));

// Parse POST form data
app.use(express.urlencoded({ extended: false }));

// Basic HTML escape to prevent XSS when reflecting input back
function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

app.post("/submit", (req, res) => {
  const username = (req.body.username || "").trim();
  const email = (req.body.email || "").trim();
  const feedback = (req.body.feedback || "").trim();

  // Server-side validation (DON'T trust the browser)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!username || !email || !feedback) {
    return res.status(400).send("Error: Please complete all fields.");
  }
  if (!emailRegex.test(email)) {
    return res.status(400).send("Error: Invalid email format.");
  }

  // Sanitize before echoing back (prevents XSS)
  const safeUser = escapeHtml(username);

  // Friendly confirmation page (simple + rubric compliant)q
  res.send(`
    <h2>Thank you!</h2>
    <p>Feedback received from <b>${safeUser}</b>.</p>
    <a href="/">Go back</a>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
