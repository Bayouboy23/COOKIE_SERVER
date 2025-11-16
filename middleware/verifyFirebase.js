import admin from "firebase-admin";

// Middleware to verify Firebase token from Authorization header
async function verifyFirebase(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Missing Authorization header" });
    }

    const token = authHeader.replace("Bearer ", "").trim();

    const decoded = await admin.auth().verifyIdToken(token);

    req.user = decoded;
    next();
  } catch (err) {
    console.error("Firebase verification error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

export default verifyFirebase;