import React, { useRef } from "react";
import VisuallyHidden from "@reach/visually-hidden";
import { DialogOverlay, DialogContent } from "@reach/dialog";

import styles from "./Dialog.module.scss";

const Dialog = ({ children, show, ariaLabel, onClose }) => {
    const dialogRef = useRef();

    return (
        <DialogOverlay
            isOpen={show}
            onDismiss={onClose}
            className={styles["dialog-overlay"]}
        >
            <DialogContent
                className={styles["dialog-content"]}
                aria-label={ariaLabel}
                ref={dialogRef}
            >
                <button className={styles["close-button"]} onClick={onClose}>
                    <VisuallyHidden>Close</VisuallyHidden>
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fal"
                        data-icon="times"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                    >
                        <path
                            fill="currentColor"
                            d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
                        ></path>
                    </svg>
                </button>
                {children}
            </DialogContent>
        </DialogOverlay>
    );
};

export default Dialog;
