const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// exports.register = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await db.execute(
//       "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
//       [name, email, hashedPassword]
//     );
//     res.status(201).json({ message: "User registered successfully." });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ error: "Registration failed. From the Server!", details: err });
//   }
// };

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const user = users[0];
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed.", details: err });
  }
};

// ==================================================================================

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );
    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error("❌ Registration error:", err);

    // 👇 Handle duplicate email
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        error: "Email already exists. Please use a different email.",
      });
    }

    // 🧯 Generic fallback error
    res.status(500).json({ error: "Registration failed. Try again later." });
  }
};
