import { useState, useEffect } from "react";
import Image from "next/image";
import Router from "next/router";
import { motion, AnimatePresence } from "framer-motion";

import Button from "../../components/Button/Button";
import Stamp from "../../components/Stamp/Stamp";
import PasscodeInput from "../../components/PasscodeInput/PasscodeInput";

import { postData } from "../../lib/fetch";

import styles from "./challenge.module.scss";

const PASSCODE_LENGTH = 4;
const PASSCODE = "2506";

const AvishChallenge = () => {
    const [passcodeAttempt, setPasscodeAttempt] = useState("");
    const [attemptSuccessful, setAttemptSuccessful] = useState(false);
    const [attemptMade, setAttemptMade] = useState(false);

    const hasErrored =
        passcodeAttempt.length === PASSCODE_LENGTH &&
        passcodeAttempt !== PASSCODE &&
        attemptMade;

    const handlePasswordChange = (passcodeAttempt) => {
        setPasscodeAttempt(passcodeAttempt);
    };

    const handlePasswordSubmit = async () => {
        if (passcodeAttempt === PASSCODE) {
            setAttemptSuccessful(true);
            await postData("/api/complete-challenge", { challenge: "avish" });
        } else {
            setAttemptMade(true);
        }
    };

    useEffect(() => {
        if (!attemptSuccessful) return;

        let timeoutId = setTimeout(() => {
            Router.push("/");
        }, 4000);

        return () => {
            if (timeoutId !== undefined) {
                clearTimeout(timeoutId);
            }
        };
    }, [attemptSuccessful]);

    return (
        <div className={styles["challenge-page"]}>
            <div className={styles["image-container"]}>
                <Image
                    src={"/avish-beck.jpg"}
                    alt="Picture of the memory"
                    width={500}
                    height={1000}
                    objectFit="cover"
                />
            </div>
            <main className={styles["challenge-content"]}>
                <h1 className={styles["challenge-title"]}>The Inebriated</h1>
                <p className={styles["challenge-description"]}>
                    Some say he is still waiting for a mate. You should probably
                    check with the stations law enforcement to make sure he got
                    home ok.
                </p>

                <div
                    className={styles["passcode-form"]}
                    data-successful={attemptSuccessful}
                >
                    <div className={styles["passcode-container"]}>
                        <PasscodeInput
                            passcode={PASSCODE}
                            passcodeAttempt={passcodeAttempt}
                            onPasswordChange={handlePasswordChange}
                            hasErrored={hasErrored}
                        />
                    </div>
                    <div className={styles["submit-passcode-btn-container"]}>
                        <Button onClick={handlePasswordSubmit} size="large">
                            Enter
                        </Button>
                    </div>
                    <AnimatePresence>
                        {attemptSuccessful && (
                            <motion.div
                                className={styles["stamp-container"]}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Stamp text="Completed" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default AvishChallenge;
