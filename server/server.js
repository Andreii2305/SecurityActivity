//Criteria #4, Backend Security Measure

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "..")));

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
    return res.status(400).send('<h2>Error:</h2> <p>Please complete all fields.</p> <a href="/">Go Back</a>'); //was gonna use different page from pages folder, but don't have enough time to implement
  }
  if (!emailRegex.test(email)) {
    return res.status(400).send('<h2>Error:</h2> <p>Invalid email format.</p> <a href="/">Go Back</a>');
  }

  // Sanitize before echoing back (prevents XSS)
  const safeUser = escapeHtml(username);

  res.send(`
    <h2>Thank you!</h2>
    <p>Feedback received from <b>${safeUser}</b>.</p>
    <a href="/">Go back</a>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
