import * as firebase from "firebase-admin";
import admin from "../../firebase/nodeApp";

export default function handler(req, res) {
    const db = admin.firestore();
    const generalStatsRef = db.collection("stats").doc("general");
    const challengeStatsRef = db.collection("stats").doc("challenges");

    Promise.all([generalStatsRef.delete(), challengeStatsRef.delete()])
        .then(() => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: true }));
        })
        .catch((e) => {
            res.status(404).end();
        });
}
