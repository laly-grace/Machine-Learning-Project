const db = require("../db");

exports.saveProfile = async (req, res) => {
  const { age, weight, height, goal, condition } = req.body;
  const userId = req.user.id;

  try {
    const [existing] = await db.execute(
      "SELECT * FROM profiles WHERE user_id = ?",
      [userId]
    );
    if (existing.length > 0) {
      await db.execute(
        "UPDATE profiles SET age=?, weight=?, height=?, goal=?, condition=? WHERE user_id=?",
        [age, weight, height, goal, condition, userId]
      );
    } else {
      await db.execute(
        "INSERT INTO profiles (user_id, age, weight, height, goal, condition) VALUES (?, ?, ?, ?, ?, ?)",
        [userId, age, weight, height, goal, condition]
      );
    }
    res.json({ message: "Profile saved" });
  } catch (err) {
    res.status(500).json({ error: "Could not save profile", details: err });
  }
};
