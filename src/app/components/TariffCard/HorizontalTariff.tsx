import { Tariff } from './types';
import styles from './TariffCard.module.css';

interface HorizontalTariffProps {
    tariff: Tariff;
    isSelected: boolean;
    showDiscount: boolean;
    showHit: boolean;
    onSelect: () => void;
}

export default function HorizontalTariff({
    tariff,
    isSelected,
    showDiscount,
    showHit,
    onSelect
}: HorizontalTariffProps) {
    const calculateDiscount = (price: number, fullPrice: number) => {
        return Math.round(((fullPrice - price) / fullPrice) * 100);
    };

    return (
        <div
            className={`${styles.horizontalBlock} ${isSelected ? styles.selected : ''} ${!showDiscount ? styles.discountEnd : ''}`}
            onClick={onSelect}
        >
            <div className={styles.blockOne}>
                {showDiscount && (
                    <div className={styles.blockProcent}>
                        -{calculateDiscount(tariff.price, tariff.full_price)}%
                    </div>
                )}
                {showHit && <div className={styles.blockHIT}>ХИТ!</div>}
            </div>
            <div className={styles.blockOur}>
                <div className={styles.blockPrice}>
                    <div className={styles.duration}>{tariff.period}</div>
                    <div className={styles.priceMain}>
                        {showDiscount ? tariff.price : tariff.full_price} ₽
                    </div>
                    {showDiscount && (
                        <div className={styles.priceOld}>
                            {tariff.full_price} ₽
                        </div>
                    )}
                </div>
                <div className={styles.descriptionSection}>
                    <div className={styles.description}>
                        {tariff.text}
                    </div>
                </div>
            </div>
        </div>
    );
}