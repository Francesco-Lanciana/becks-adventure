import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import firebase from "../firebase/clientApp";
import { addMinutes } from "date-fns";

import Card from "../components/Card/Card";
import Countdown from "../components/Countdown/Countdown";
import Dialog from "../components/Dialog/Dialog";
import Button from "../components/Button/Button";

import styles from "./home.module.scss";

export default function Home() {
    const [showIntro, setShowIntro] = useState(false);
    // Our custom hook to get context values
    const { loadingUser, user } = useUser();

    const profile = { username: "nextjs_user", message: "Awesome!!" };

    useEffect(() => {
        if (!loadingUser) {
            // You know that the user is loaded: either logged in or out!
            console.log(user);
        }
        // You also have your firebase app initialized
        console.log(firebase);
    }, [loadingUser, user]);

    const createUser = async () => {
        const db = firebase.firestore();
        await db.collection("profile").doc(profile.username).set(profile);
        alert("User created!!");
    };

    return (
        <div className={styles["home-page"]}>
            <Head>
                <title>Becks Adventure</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Dialog show={showIntro} onClose={() => setShowIntro(false)}>
                <div className={styles["intro-popover"]}>
                    <div className={styles["intro-popover"]}></div>
                </div>
            </Dialog>

            <main>
                <h1 className={styles["title"]}>A trip down memory lane</h1>
                <p className={styles["description"]}>
                    You have until January the 9th to assemble all the clues and
                    figure out where Olivér is hiding Natt, otherwise she'll be
                    sleeping with the fishes.
                    <span className={styles["pressure"]}>No pressure.</span>
                </p>

                <div className={styles["countdown-container"]}>
                    <Countdown
                        countdownDate={new Date("January 09, 2021 03:00:00")}
                    />
                </div>

                <div className={styles["cards"]}>
                    <div className={styles["nat-container"]}>
                        <Card
                            id="nat"
                            title="A test"
                            displayImageUrl="/nat-display.png"
                            hoverImageUrl="/nat-hover.png"
                            unlocked={true}
                            completed={true}
                        />
                    </div>

                    <div className={styles["frankie-container"]}>
                        <Card
                            id="frankie"
                            title="The Lover"
                            displayImageUrl="/frankie-display.jpg"
                            hoverImageUrl="/frankie-hover.jpg"
                            unlocked={false}
                        />
                    </div>

                    <div className={styles["elena-container"]}>
                        <Card
                            id="elena"
                            title="The Oddball"
                            displayImageUrl="/elena-display.jpg"
                            hoverImageUrl="/elena-hover.jpg"
                            unlocked={true}
                        />
                    </div>

                    <div className={styles["avish-container"]}>
                        <Card
                            id="avish"
                            title="The Inebriated"
                            displayImageUrl="/frankie-display.jpg"
                            hoverImageUrl="/frankie-hover.jpg"
                            unlocked={false}
                        />
                    </div>
                </div>

                <div className={styles["replay-intro-btn-container"]}>
                    <Button
                        variant="secondary"
                        size="small"
                        onClick={() => setShowIntro(true)}
                    >
                        Replay intro
                    </Button>
                </div>
            </main>
        </div>
    );
}
