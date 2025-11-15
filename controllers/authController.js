import admin from "../config/firebase.js";


export async function getUser(req, res) {
  try {
    const uid = req.user.uid;
    const user = await admin.auth().getUser(uid);
    res.json({ uid: user.uid, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to fetch user." });
  }
}

