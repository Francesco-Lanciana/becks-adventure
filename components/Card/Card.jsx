import { useState } from "react";
import Image from "next/image";
import Router from "next/router";
import Link from "next/link";

import Stamp from "../Stamp/Stamp";

import styles from "./Card.module.scss";

const Card = ({
    id,
    unlocked = false,
    title,
    displayImageUrl,
    hoverImageUrl,
    completed = false,
}) => {
    function handleClick() {
        if (unlocked) {
            Router.push(`/challenge/${id}`);
        }
    }

    return (
        <div
            className={styles.card}
            data-disabled={!unlocked}
            onClick={handleClick}
            data-completed={completed}
        >
            <div className={styles["image-container"]}>
                <div className={styles["display-image"]}>
                    <Image
                        src={displayImageUrl}
                        alt="Picture of the memory"
                        width={500}
                        height={800}
                        objectFit="cover"
                    />
                </div>
                <div className={styles["hover-image"]}>
                    <Image
                        src={hoverImageUrl}
                        alt="Picture of the memory"
                        width={500}
                        height={800}
                        className={styles["hover-image"]}
                        objectFit="cover"
                    />
                </div>
            </div>

            <div className={styles["metadata-container"]}>
                <h2 className={styles["card-title"]}>{title}</h2>
            </div>

            {!unlocked && (
                <div className={styles["overlay"]}>
                    <div className={styles["overlay-lock"]}>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="far"
                            data-icon="lock"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path
                                fill="currentColor"
                                d="M400 192h-32v-46.6C368 65.8 304 .2 224.4 0 144.8-.2 80 64.5 80 144v48H48c-26.5 0-48 21.5-48 48v224c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V240c0-26.5-21.5-48-48-48zm-272-48c0-52.9 43.1-96 96-96s96 43.1 96 96v48H128v-48zm272 320H48V240h352v224z"
                            ></path>
                        </svg>
                    </div>
                    <p className={styles["overlay-text"]}>
                        Complete previous challenge to unlock
                    </p>
                </div>
            )}

            {completed && <Stamp text="Completed" />}
        </div>
    );
};

export default Card;
