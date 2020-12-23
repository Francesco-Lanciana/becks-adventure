import { useState } from "react";
import OtpInput from "react-otp-input";

import styles from "./PasscodeInput.module.scss";

const PasscodeInput = ({
    length,
    passcodeAttempt,
    onPasswordChange,
    hasErrored,
}) => {
    return (
        <OtpInput
            onChange={onPasswordChange}
            numInputs={length}
            separator={<span>-</span>}
            inputStyle={styles["input"]}
            containerStyle={styles["container"]}
            errorStyle={styles["error"]}
            hasErrored={hasErrored}
            value={passcodeAttempt}
        />
    );
};

export default PasscodeInput;
