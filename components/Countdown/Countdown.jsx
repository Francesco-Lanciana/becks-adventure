import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { differenceInMinutes } from "date-fns";

import styles from "./Countdown.module.scss";

// Random component
const Completionist = () => <span>You are good to go!</span>;

const Countdown = ({ countdownDate }) => {
    const [time, setTime] = useState([0, 0, 0]);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        if (isCompleted) return;
        let timeoutId;

        timeoutId = setInterval(() => {
            const minutesToDate = differenceInMinutes(
                new Date(countdownDate),
                new Date()
            );
            const isCompleted = minutesToDate <= 0;

            if (isCompleted) {
                setIsCompleted(true);
            } else {
                const minutes = Math.ceil(minutesToDate / 60);
                const hours = Math.floor((minutesToDate / 60) % 24);
                const days = Math.floor(minutesToDate / (60 * 24));

                setTime([days, hours, minutes]);
            }
        }, 1000);

        return () => {
            if (timeoutId !== undefined) {
                clearTimeout(timeoutId);
            }
        };
    }, [isCompleted, countdownDate]);

    if (isCompleted) {
        return <Completionist />;
    } else {
        return (
            <span className={styles["countdown"]}>
                <TimeCounter unit="Days" value={time[0]} />
                <TimeCounter unit="Hours" value={time[1]} />
                <TimeCounter unit="Minutes" value={time[2]} />
            </span>
        );
    }
};

const TimeCounter = ({ unit, value }) => {
    const paddedValue = value.toString().padStart(2, "0");
    const firstDigit = paddedValue[0];
    const secondDigit = paddedValue[1];

    return (
        <div className={styles["time-counter"]}>
            <div className={styles["time-unit-label"]}>{unit}</div>
            <div className={styles["digits"]}>
                <AnimatePresence>
                    <motion.span className={styles["digit"]} key="first">
                        {firstDigit}
                    </motion.span>
                    <motion.span className={styles["digit"]} key="second">
                        {secondDigit}
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Countdown;
