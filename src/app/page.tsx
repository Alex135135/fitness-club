"use client"
import { useState, useEffect } from "react"
import Header from './components/Header/header';
import HorizontalTariff from './components/TariffCard/HorizontalTariff';
import VerticalTariff from './components/TariffCard/VerticalTariff';
import CheckoutSection from './components/CheckoutSection/CheckoutSection';
import GuaranteeSection from './components/GuaranteeSection/GuaranteeSection';
import styles from "./page.module.css";

interface Tariff {
  id: string;
  period: string;
  price: number;
  full_price: number;
  is_best: boolean;
  text: string;
}

export default function Home() {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [selectedTariff, setSelectedTariff] = useState<string | null>(null);
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [isButtonPulsing, setIsButtonPulsing] = useState(false);
  const [showDiscount, setShowDiscount] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHorizontal, setSelectedHorizontal] = useState<string | null>(null);
  const [selectedVertical, setSelectedVertical] = useState<string | null>(null);
  const [showHit, setShowHit] = useState(true);

  useEffect(() => {
    const fetchTariffs = async () => {
      try {
        const response = await fetch('https://t-core.fit-hub.pro/Test/GetTariffs');
        const data = await response.json();
        setTariffs(data);
        const bestTariff = data.find((tariff: Tariff) => tariff.is_best);
        if (bestTariff) setSelectedTariff(bestTariff.id);
      } catch (error) {
        console.error('Ошибка загрузки тарифов:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTariffs();
  }, []);

  const handleTimeEnd = () => {
    setShowDiscount(false);
    setShowHit(false);
  };

  const handleBuyClick = () => {
    if (!selectedTariff) {
      alert("Пожалуйста, выберите тариф");
      return;
    }
    if (!isAgreementChecked) {
      alert("Пожалуйста, согласитесь с условиями");
      return;
    }
    const selectedTariffData = tariffs.find(tariff => tariff.id === selectedTariff);
    alert(`Выбран тариф: ${selectedTariffData?.period}`);
  };

  if (isLoading) {
    return (
      <div className={styles.back}>
        <div className={styles.loading}>Загрузка тарифов...</div>
      </div>
    );
  }

  const bestTariff = tariffs.find(tariff => tariff.is_best);
  const verticalTariffs = tariffs.filter(tariff => !tariff.is_best);

  return (
    <div className={styles.back}>
      <Header onTimeEnd={handleTimeEnd} />
      <main className={styles.main}>
        <div className={styles.newDiv}>
          <h2 className={styles.h2}>
            Выбери подходящий для себя <span className={styles.yellowText}>тариф</span>
          </h2>
        </div>

        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <img src="/logo.png" alt="Логотип" />
          </div>

          <div className={styles.blocksContainerOne}>
            {bestTariff && (
              <HorizontalTariff
                tariff={bestTariff}
                isSelected={selectedHorizontal === bestTariff.id}
                showDiscount={showDiscount}
                showHit={showHit}
                onSelect={() => {
                  setSelectedHorizontal(bestTariff.id);
                  setSelectedVertical(null);
                  setIsButtonPulsing(true);
                }}
              />
            )}

            <div className={styles.threeBlock}>
              {verticalTariffs.map((tariff) => (
                <VerticalTariff
                  key={tariff.id}
                  tariff={tariff}
                  isSelected={selectedVertical === tariff.id}
                  showDiscount={showDiscount}
                  onSelect={() => {
                    setSelectedVertical(tariff.id);
                    setSelectedHorizontal(null);
                    setIsButtonPulsing(true);
                  }}
                />
              ))}
            </div>

            <CheckoutSection
              isAgreementChecked={isAgreementChecked}
              onAgreementChange={setIsAgreementChecked}
              isButtonPulsing={isButtonPulsing}
              onBuyClick={handleBuyClick}
              isAnyTariffSelected={!!(selectedHorizontal || selectedVertical)}
            />
          </div>
        </div>

        <GuaranteeSection />
      </main>
    </div>
  )
}