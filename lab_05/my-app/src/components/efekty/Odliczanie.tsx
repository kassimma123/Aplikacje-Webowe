import React, { useState, useEffect } from 'react';

const Odliczanie: React.FC = () => {
    const [czas, setCzas] = useState(15.0);
    const [aktywny, setAktywny] = useState(false);
    const [zakonczone, setZakonczone] = useState(false);

    useEffect(() => {
        let interval: any;

        if (aktywny && czas > 0) {
            interval = setInterval(() => {
                setCzas((prevCzas) => {
                    if (prevCzas <= 0.1) {
                        setAktywny(false);
                        setZakonczone(true);
                        return 0;
                    }
                    return prevCzas - 0.1;
                });
            }, 100); // 100ms = 0.1s
        } else if (!aktywny) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [aktywny, czas]);

    const toggleTimer = () => {
        setAktywny(!aktywny);
    };

    let buttonText = "START";
    if (zakonczone) buttonText = "Odliczanie zakończone";
    else if (aktywny) buttonText = "STOP";

    return (
        <div>
            <h3>Odliczanie 6.3</h3>
            <div>{czas.toFixed(1)} sek</div>
            <button
                onClick={toggleTimer}
                disabled={zakonczone}
            >
                {buttonText}
            </button>
        </div>
    );
};

export default Odliczanie;