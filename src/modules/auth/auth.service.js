import bcrypt from "bcrypt";
import { pool } from "../../config/db.js";
import { generateToken } from "../../utils/jwt.js";

export const registerUser = async ({ email, password, role }) => {
  const existing = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (existing.rows.length > 0) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    "INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role",
    [email, hashedPassword, role || "user"]
  );

  return result.rows[0];
};
export const loginUser = async ({ email, password }) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({
    id: user.id,
    role: user.role,
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
};
export const getUserCount = async () => {
  const result = await pool.query("SELECT COUNT(*) FROM users");
  return parseInt(result.rows[0].count);
};