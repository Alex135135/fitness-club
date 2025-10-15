import styles from './GuaranteeSection.module.css';

export default function GuaranteeSection() {
    return (
        <div className={styles.garant}>
            <div className={styles.p1}>
                <p className={styles.p1Text}>гарантия возврата 30 дней</p>
            </div>
            <p className={styles.p2}>
                Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели!
                Мы даже готовы полностью вернуть твои деньги в течение 30 дней с момента покупки,
                если ты не получишь видимых результатов.
            </p>
        </div>
    );
}