// middleware/verifyToken.js

function verifyToken(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  // Skip Firebase verification for now
  next();
}

export default verifyFirebase;

