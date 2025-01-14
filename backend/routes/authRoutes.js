const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // Αν χρησιμοποιούμε hashed passwords
const router = express.Router();

// Mock data (π.χ., διαχειριστής)
const admin = {
  username: "admin",
  password: "$2a$10$yH1F8sZ/qVtPfTUMT9kW7O.L9OaYlEwPQtiRLkm9JG5J3H7.o.vzW" // bcrypt hash για το "admin123"
};

// POST /api/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Έλεγχος username
  if (username !== admin.username) {
    return res.status(401).json({ message: "Λάθος όνομα χρήστη ή κωδικός." });
  }

  // Έλεγχος password
  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Λάθος όνομα χρήστη ή κωδικός." });
  }

  // Δημιουργία JWT
  const token = jwt.sign({ username: admin.username }, "secretkey", {
    expiresIn: "1h", // Λήξη σε 1 ώρα
  });

  res.json({ token });
});

module.exports = router;
