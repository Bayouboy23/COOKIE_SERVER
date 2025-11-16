import admin from "../config/firebase.js";

// Middleware to verify Firebase token from Authorization header
async function verifyFirebase(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Missing Authorization header" });
    }

    // Extract token
    const token = authHeader.replace("Bearer ", "").trim();

    if (!token) {
      return res.status(401).json({ error: "Missing token" });
    }

    // Verify token using Firebase Admin
    const decoded = await admin.auth().verifyIdToken(token);

    // Attach decoded user to request
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Firebase auth error:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

export default verifyFirebase;
