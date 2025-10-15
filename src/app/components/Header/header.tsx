import styles from "./header.module.css";
import Timer from '../Timer/Timer';

interface HeaderProps {
    onTimeEnd?: () => void;
}

export default function Header({ onTimeEnd }: HeaderProps) {
    return (
        <header className={styles.header}>
            <h1 className={styles.h1}>Успейте открыть пробную неделю</h1>
            <Timer onTimeEnd={onTimeEnd} />
        </header>
    )
}