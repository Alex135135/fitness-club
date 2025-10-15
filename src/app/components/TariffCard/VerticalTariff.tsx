import { Tariff } from './types';
import styles from './TariffCard.module.css';

interface VerticalTariffProps {
    tariff: Tariff;
    isSelected: boolean;
    showDiscount: boolean;
    onSelect: () => void;
}

export default function VerticalTariff({
    tariff,
    isSelected,
    showDiscount,
    onSelect
}: VerticalTariffProps) {
    const calculateDiscount = (price: number, fullPrice: number) => {
        return Math.round(((fullPrice - price) / fullPrice) * 100);
    };

    return (
        <div
            className={`${styles.verticalBlock} ${isSelected ? styles.selected : ''} ${!showDiscount ? styles.discountEnd : ''}`}
            onClick={onSelect}
        >
            {showDiscount && (
                <div className={styles.blockProcentTwo}>
                    -{calculateDiscount(tariff.price, tariff.full_price)}%
                </div>
            )}
            <div className={styles.blockBig}>
                <div className={styles.blockPriceTwo}>
                    <div className={styles.blockMounth}>{tariff.period}</div>
                    <div className={styles.priceMainTwo}>
                        {showDiscount ? tariff.price : tariff.full_price} ₽
                    </div>
                    {showDiscount && (
                        <div className={styles.priceOldTwo}>
                            {tariff.full_price} ₽
                        </div>
                    )}
                </div>
                <div className={styles.descriptionTwo}>
                    {tariff.text}
                </div>
            </div>
        </div>
    );
}