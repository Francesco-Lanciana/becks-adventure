import * as firebase from "firebase-admin";
import admin from "../../firebase/nodeApp";

export default function handler(req, res) {
    const db = admin.firestore();
    const generalStatsRef = db.collection("stats").doc("general");

    generalStatsRef
        .update({
            intro: true,
        })
        .then(() => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: true }));
        })
        .catch((e) => {
            generalStatsRef
                .set({ intro: true })
                .then(() => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify({ success: true }));
                })
                .catch(() => {
                    res.status(404).end();
                });
        });
}
