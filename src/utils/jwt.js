import jwt from "jsonwebtoken";

const SECRET = "supersecretkey"; // move to .env later

export const generateToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};