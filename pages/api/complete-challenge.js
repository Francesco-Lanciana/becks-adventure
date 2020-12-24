import * as firebase from "firebase-admin";
import admin from "../../firebase/nodeApp";

const ACCEPTED_CHALLENGES = ["elena", "nat", "frankie", "avish", "final"];

export default function handler(req, res) {
    const challenge = req.body.challenge;

    if (!ACCEPTED_CHALLENGES.includes(challenge)) {
        res.status(404).end();
        return;
    }

    const db = admin.firestore();
    const challengeStatsRef = db.collection("stats").doc("challenges");

    challengeStatsRef
        .update({
            completed: firebase.firestore.FieldValue.arrayUnion(challenge),
        })
        .then(() => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: true }));
        })
        .catch((e) => {
            challengeStatsRef
                .set({ completed: [challenge] })
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
