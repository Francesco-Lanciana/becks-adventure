import { useEffect } from "react";
import Image from "next/image";
import Router from "next/router";

import Button from "../../components/Button/Button";
import Stamp from "../../components/Stamp/Stamp";

const FrankieChallenge = () => {
    const [passcodeAttempt, setPasscodeAttempt] = useState("");
    const [attemptSuccessful, setAttemptSuccessful] = useState(false);

    const handlePasswordChange = (passcodeAttempt) => {
        setPasscodeAttempt(passcodeAttempt);
    };

    const handlePasswordSubmit = () => {
        if (passcodeAttempt === "0225") {
            setAttemptSuccessful(true);
        }
    };

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            Router.push("/");
        }, 2000);

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
                    src={"/elena-beck.jpg"}
                    alt="Picture of the memory"
                    width={500}
                    height={1000}
                    objectFit="cover"
                />
            </div>
            <main className={styles["challenge-content"]}>
                <h1 className={styles["challenge-title"]}>The Lover</h1>
                <p className={styles["challenge-description"]}>
                    He has a loud voice without even trying, and he uses that
                    voice for talking and rhyming. He's been known to say some
                    incredibly profound things, alsome more . Of all the
                    profound things he has ever said, one sticks out above all
                    the rest. On a night a year after they had __ met, he yelled
                </p>

                <div
                    className={styles["passcode-form"]}
                    data-successful={attemptSuccessful}
                >
                    <div className={styles["passcode-container"]}>
                        <PasscodeInput
                            passcode="0225"
                            passcodeAttempt={passcodeAttempt}
                            onPasswordChange={handlePasswordChange}
                        />
                    </div>
                    <div className={styles["submit-passcode-btn-container"]}>
                        <Button onClick={handlePasswordSubmit} />
                    </div>
                    <div className={styles["stamp-container"]}>
                        <Stamp text="Completed" />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FrankieChallenge;
