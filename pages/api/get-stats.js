import * as firebase from "firebase-admin";
import admin from "../../firebase/nodeApp";

export default function handler(req, res) {
    const db = admin.firestore();
    const generalStatsRef = db.collection("stats").doc("general");
    const challengeStatsRef = db.collection("stats").doc("challenges");

    Promise.all([generalStatsRef.get(), challengeStatsRef.get()])
        .then(([genDoc, statDoc]) => {
            const genData = genDoc?.exists ? genDoc.data() : {};
            const statData = statDoc?.exists ? statDoc.data() : {};

            console.log(genData, statData);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ...genData, ...statData }));
        })
        .catch((e) => {
            console.log(e);
            res.status(404).end();
        });
}
