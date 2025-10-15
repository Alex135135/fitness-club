// components/Timer.jsx
"use client";
import { useState, useEffect } from 'react';
import styles from './Timer.module.css';

export default function Timer({ onTimeEnd }) {
    const [timeLeft, setTimeLeft] = useState(120);
    const [timerColor, setTimerColor] = useState('yellow');

    useEffect(() => {
        if (timeLeft <= 0) {
            setTimerColor('white');
            onTimeEnd?.();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                const newTime = prevTime - 1;


                if (newTime <= 0) {
                    setTimerColor('white');
                } else if (newTime <= 30) {
                    setTimerColor('red');
                } else {
                    setTimerColor('yellow');
                }

                if (newTime <= 0) {
                    clearInterval(timer);
                    onTimeEnd?.();
                    return 0;
                }
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onTimeEnd]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className={`${styles.timer} ${styles[timerColor]}`}>
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.83399 0.799865C6.06277 0.1816 6.93723 0.181601 7.16601 0.799866L8.27732 3.80312C8.34924 3.9975 8.5025 4.15076 8.69688 4.22268L11.7001 5.33399C12.3184 5.56277 12.3184 6.43723 11.7001 6.66601L8.69688 7.77732C8.5025 7.84924 8.34924 8.0025 8.27732 8.19688L7.16601 11.2001C6.93723 11.8184 6.06277 11.8184 5.83399 11.2001L4.72268 8.19688C4.65076 8.0025 4.4975 7.84924 4.30312 7.77732L1.29986 6.66601C0.6816 6.43723 0.681601 5.56277 1.29987 5.33399L4.30312 4.22268C4.4975 4.15076 4.65076 3.9975 4.72268 3.80312L5.83399 0.799865Z" fill="currentColor" />
            </svg>
            {formatTime(timeLeft)}
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.83399 0.799865C6.06277 0.1816 6.93723 0.181601 7.16601 0.799866L8.27732 3.80312C8.34924 3.9975 8.5025 4.15076 8.69688 4.22268L11.7001 5.33399C12.3184 5.56277 12.3184 6.43723 11.7001 6.66601L8.69688 7.77732C8.5025 7.84924 8.34924 8.0025 8.27732 8.19688L7.16601 11.2001C6.93723 11.8184 6.06277 11.8184 5.83399 11.2001L4.72268 8.19688C4.65076 8.0025 4.4975 7.84924 4.30312 7.77732L1.29986 6.66601C0.6816 6.43723 0.681601 5.56277 1.29987 5.33399L4.30312 4.22268C4.4975 4.15076 4.65076 3.9975 4.72268 3.80312L5.83399 0.799865Z" fill="currentColor" />
            </svg>
        </div>
    );
}