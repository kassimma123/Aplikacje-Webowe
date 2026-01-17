import React, { useState, useEffect } from 'react';

const Licznik: React.FC = () => {
    const [count, setCount] = useState<number>(()=>{
    const savedCount = localStorage.getItem('licznik_wartosc');
    return savedCount ? parseInt(savedCount, 10) : 0;
    });

    useEffect(() => {
        localStorage.setItem('licznik_wartosc', count.toString());
    }, [count]);

    return (
        <div style={{padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
            <h3>Zadanie 8.1: Licznik z pamięcią</h3>
            <p>Licznik: <strong>{count}</strong></p>
            <button onClick={() => setCount(count + 1)}>Dodaj</button>
            <button onClick={() => { setCount(0); localStorage.removeItem('licznik_wartosc'); }} style={{ marginLeft: '10px' }}>
                Reset
            </button>
        </div>
    );
};
export default Licznik;