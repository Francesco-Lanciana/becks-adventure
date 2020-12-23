import styles from "./Button.module.scss";

const Button = ({
    children,
    onClick,
    variant = "primary",
    size = "medium",
    type = "primary",
    theme = "light",
}) => (
    <button
        className={styles["button"]}
        onClick={onClick}
        data-variant={variant}
        data-type={type}
        data-size={size}
        data-theme={theme}
    >
        {children}
    </button>
);

export default Button;
