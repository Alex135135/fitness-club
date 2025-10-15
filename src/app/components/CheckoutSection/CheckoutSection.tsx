import { useState } from 'react';
import styles from './CheckoutSection.module.css';

interface CheckoutSectionProps {
    isAgreementChecked: boolean;
    onAgreementChange: (checked: boolean) => void;
    isButtonPulsing: boolean;
    onBuyClick: () => void;
    isAnyTariffSelected: boolean;
}

export default function CheckoutSection({
    isAgreementChecked,
    onAgreementChange,
    isButtonPulsing,
    onBuyClick,
    isAnyTariffSelected
}: CheckoutSectionProps) {
    const [wasValidationAttempted, setWasValidationAttempted] = useState(false);

    const handleBuyClick = () => {
        if (!isAgreementChecked) {
            // Показываем ошибку если чекбокс не отмечен
            setWasValidationAttempted(true);
            return;
        }

        // Сбрасываем ошибку если все ок
        setWasValidationAttempted(false);
        onBuyClick();
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onAgreementChange(e.target.checked);
        // Сбрасываем ошибку когда пользователь ставит галочку
        if (e.target.checked && wasValidationAttempted) {
            setWasValidationAttempted(false);
        }
    };

    return (
        <div className={styles.bottomSection}>
            <div className={styles.texts}>
                <div className={styles.textOne}>
                    <div className={styles.iconContainer}>
                        <svg width="4" height="18" viewBox="0 0 4 18" fill="none">
                            <path d="M0.877523 11.6437C0.886898 12.2578 1.38846 12.75 2.00252 12.75C2.61659 12.75 3.11815 12.2531 3.12752 11.6437L3.50252 1.5375C3.52596 1.15313 3.38534 0.778125 3.11346 0.4875C2.82284 0.178125 2.41971 0 2.00252 0C1.58534 0 1.18221 0.178125 0.891586 0.4875C0.619711 0.778125 0.479086 1.15313 0.502523 1.5375L0.877523 11.6437Z" fill="#FDB056" />
                            <path d="M2 18C2.82843 18 3.5 17.3284 3.5 16.5C3.5 15.6716 2.82843 15 2 15C1.17157 15 0.5 15.6716 0.5 16.5C0.5 17.3284 1.17157 18 2 18Z" fill="#FDB056" />
                        </svg>
                    </div>
                    <div className={styles.span}>
                        <span className={styles.line}>
                            Следуя плану на 3 месяца и более, люди получают в 2 раза лучший результат, чем за 1 месяц
                        </span>
                    </div>
                </div>

                <div className={styles.checkboxContainer}>
                    <input
                        type="checkbox"
                        id="agreement"
                        className={styles.checkbox}
                        checked={isAgreementChecked}
                        onChange={handleCheckboxChange}
                    />
                    <label
                        htmlFor="agreement"
                        className={`${styles.customCheckbox} ${wasValidationAttempted && !isAgreementChecked ? styles.red : ''}`}
                    ></label>
                    <label htmlFor="agreement" className={styles.checkboxLabel}>
                        Я согласен с{" "}
                        <a href="/offer" className={styles.link}>офертой рекуррентных платежей</a>{" "}
                        и{" "}
                        <a href="/privacy" className={styles.link}>Политикой конфиденциальности</a>
                    </label>
                </div>

                <button
                    className={`${styles.button} ${isButtonPulsing ? styles.pulse : ''}`}
                    onClick={handleBuyClick}
                >
                    Купить
                </button>

                <div className={styles.additionalText}>
                    Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения пожизненного доступа к приложению. Пользователь соглашается, что данные кредитной/дебетовой карты будут сохранены для осуществления покупок дополнительных услуг сервиса в случае желания пользователя.
                </div>
            </div>
        </div>
    );
}