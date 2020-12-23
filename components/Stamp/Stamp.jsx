import styles from "./Stamp.module.scss";

const Stamp = ({ text }) => <div className={styles["stamp"]}>{text}</div>;

export default Stamp;
