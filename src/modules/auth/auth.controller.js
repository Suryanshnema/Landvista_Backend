// import bcrypt from "bcrypt";
// import { pool } from "../../config/db.js";

// export const registerUser = async ({ email, password }) => {
//   // Check if user exists
//   const existing = await pool.query(
//     "SELECT * FROM users WHERE email = $1",
//     [email]
//   );

//   if (existing.rows.length > 0) {
//     throw new Error("User already exists");
//   }

//   // Hash password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Insert user
//   const result = await pool.query(
//     "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, role",
//     [email, hashedPassword]
//   );

//   return result.rows[0];
// };
import { registerUser, loginUser } from "./auth.service.js";

export const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    // ✅ Allowed roles
    const allowedRoles = ["investor", "founder", "analyst"];

    let assignedRole = "user"; // default

    if (role && allowedRoles.includes(role)) {
      assignedRole = role;
    }

    // ❌ NEVER allow admin here
    if (role === "admin") {
      return res.status(403).json({
        message: "Cannot assign admin role during registration",
      });
    }

    const user = await registerUser({
      email,
      password,
      role: assignedRole,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const login = async (req, res) => {
  try {
    const data = await loginUser(req.body);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const getTotalUsers = async (req, res) => {
  try {
    const count = await getUserCount();
    res.json({ totalUsers: count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};