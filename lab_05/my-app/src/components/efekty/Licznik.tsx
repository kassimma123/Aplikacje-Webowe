import React, { useState, useEffect } from 'react';

const Licznik: React.FC = () => {
    const [count, setCount] = useState<number>(0);
    useEffect(() => {
        console.log("Hello World");
    }, []);

    useEffect(() => {
        console.log(`Licznik zwiększył się do ${count}`);
    }, [count]);

    return (
        <div>
            <h3>Licznik z efektem 6.1</h3>
            <div>Stan: {count}</div>
            <button onClick={() => setCount(count + 1)}>Dodaj</button>
        </div>
    );
};
export default Licznik;