import React, { useState } from 'react';

const Licznik: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    return (
        <div>
            <h3>Licznik 2.1</h3>
            <div>Stan: {count}</div>
            <button onClick={() => setCount(count + 1)}>Dodaj</button>
        </div>
    );
};

export default Licznik;
