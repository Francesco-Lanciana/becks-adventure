import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import firebase from "../firebase/clientApp";
import { addMinutes } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { differenceInMinutes } from "date-fns";
import Image from "next/image";

import Card from "../components/Card/Card";
import Countdown from "../components/Countdown/Countdown";
import Dialog from "../components/Dialog/Dialog";
import Button from "../components/Button/Button";
import Map from "../components/Map/Map";
import PasscodeInput from "../components/PasscodeInput/PasscodeInput";

import styles from "./home.module.scss";

const location = {
    address: "Olivé's Abode",
    lat: -37.819548,
    lng: 144.945871,
};

const PASSCODE = "7272";

export default function Home() {
    const [showIntro, setShowIntro] = useState(false);
    const [passcodeAttempt, setPasscodeAttempt] = useState("");
    const [attemptMade, setAttemptMade] = useState(false);
    const [attemptSuccessful, setAttemptSuccessful] = useState(false);
    const { width, height } = useWindowSize();

    const countdownDate = new Date("January 09, 2021 03:00:00");
    const minutesToDate = differenceInMinutes(
        new Date(countdownDate),
        new Date()
    );
    const countdownFinished = minutesToDate <= 0;

    const hasErrored =
        passcodeAttempt.length === PASSCODE.length &&
        passcodeAttempt !== PASSCODE &&
        attemptMade;

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

    const handlePasswordSubmit = () => {
        if (passcodeAttempt === PASSCODE) {
            setAttemptSuccessful(true);
        } else {
            setAttemptMade(true);
        }
    };

    function handleStartAdventure() {
        setShowIntro(false);
    }

    return (
        <div className={styles["home-page"]}>
            <Head>
                <title>Becks Adventure</title>
            </Head>

            <Dialog show={showIntro} onClose={() => setShowIntro(false)}>
                <div className={styles["intro-popover"]}>
                    <div className={styles["pictures"]}>
                        <div className={styles["oliver"]}>
                            <Image
                                src="/ollie-menacing.jpg"
                                alt="Villian"
                                width={100}
                                height={100}
                                objectFit="cover"
                            />
                        </div>
                        <div className={styles["nat"]}>
                            <Image
                                src="/nat-despair.jpg"
                                alt="Villian"
                                width={100}
                                height={100}
                                objectFit="cover"
                            />
                        </div>
                    </div>

                    <p className={styles["explainer"]}>
                        The dastardly Olivé has kidnapped Natt and is holding
                        her in an undisclosed location. Like all great villians
                        he has left behind a trail of codes that when combined
                        will reveal his location. You have until January the 9th
                        to collect all the codes! And remember, no adventuring
                        without your adventure hat.
                    </p>

                    <div className={styles["goto-equipment-btn-container"]}>
                        <div className={styles["goto-equipment-btn"]}>
                            <Button
                                variant="primary"
                                size="medium"
                                onClick={handleStartAdventure}
                            >
                                Start Adventure
                            </Button>
                        </div>
                    </div>
                </div>
            </Dialog>

            <main>
                {attemptSuccessful && (
                    <Confetti
                        width={width}
                        height={height}
                        numberOfPieces={100}
                        gravity={0.02}
                    />
                )}
                <h1 className={styles["title"]}>A trip down memory lane</h1>
                <p className={styles["description"]}>
                    You have until January the 9th to assemble all the clues and
                    figure out where Olivé is hiding Natt, otherwise she'll be
                    sleeping with the fishes.{" "}
                    <span className={styles["pressure"]}>No pressure.</span>
                </p>
                {!countdownFinished && (
                    <div className={styles["countdown-container"]}>
                        <Countdown countdownDate={countdownDate} />
                    </div>
                )}

                {countdownFinished && (
                    <div className={styles["final-boss-container"]}>
                        {!attemptSuccessful && (
                            <motion.div className={styles["showdown"]}>
                                <h2 className={styles["final-boss-title"]}>
                                    The Showdown
                                </h2>
                                <p className={styles["final-boss-description"]}>
                                    Congratulations on making it this far. You
                                    have proven you have what it takes to go
                                    head to head with the wicked Olivé. He
                                    fancies himself as a boxer. Make sure you
                                    come fully equiped!
                                </p>

                                <div className={styles["passcode-container"]}>
                                    <PasscodeInput
                                        passcode={PASSCODE}
                                        passcodeAttempt={passcodeAttempt}
                                        onPasswordChange={(attempt) =>
                                            setPasscodeAttempt(attempt)
                                        }
                                        hasErrored={hasErrored}
                                    />
                                </div>
                                <div
                                    className={
                                        styles["passcode-submit-btn-container"]
                                    }
                                >
                                    <Button
                                        variant="secondary"
                                        size="large"
                                        theme="dark"
                                        onClick={handlePasswordSubmit}
                                    >
                                        Enter
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {attemptSuccessful && (
                            <motion.div className={styles["completed"]}>
                                <h2 className={styles["final-boss-title"]}>
                                    Congratulations
                                </h2>
                                <p className={styles["final-boss-description"]}>
                                    I can't believe he didn't even show up.
                                    Obviously he heard the tales of your
                                    destructive prowess and ran away! Now let's
                                    go rescue Natt.
                                </p>
                                <div className={styles["map-container"]}>
                                    <Map location={location} zoomLevel={17} />
                                </div>
                            </motion.div>
                        )}
                    </div>
                )}

                <div className={styles["cards"]}>
                    <div className={styles["elena-container"]}>
                        <Card
                            id="elena"
                            title="The Oddball"
                            displayImageUrl="/elena-display.jpg"
                            hoverImageUrl="/elena-hover.jpg"
                            unlocked={true}
                            completed={false}
                        />
                    </div>

                    <div className={styles["frankie-container"]}>
                        <Card
                            id="frankie"
                            title="The Lover"
                            displayImageUrl="/frankie-display.jpg"
                            hoverImageUrl="/frankie-hover.jpg"
                            unlocked={true}
                            completed={false}
                        />
                    </div>

                    <div className={styles["nat-container"]}>
                        <Card
                            id="nat"
                            title="The Explorer"
                            displayImageUrl="/nat-display.jpg"
                            hoverImageUrl="/nat-hover.jpg"
                            unlocked={true}
                            completed={false}
                        />
                    </div>

                    <div className={styles["avish-container"]}>
                        <Card
                            id="avish"
                            title="The Inebriated"
                            displayImageUrl="/avish-display.jpg"
                            hoverImageUrl="/avish-hover.jpg"
                            unlocked={false}
                            completed={false}
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
