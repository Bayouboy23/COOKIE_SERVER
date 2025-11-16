function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  // (Optional) Add Firebase/JWT verification here later

  next();
}

export default verifyToken;


