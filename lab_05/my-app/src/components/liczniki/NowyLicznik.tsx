import React, { useState } from 'react';
import Przycisk from './Przycisk';

const NowyLicznik: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    const zwiekszLicznik = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <h3>Nowy Licznik 2.2</h3>
            <div> Stan: {count}</div>
            <Przycisk inkrementuj={zwiekszLicznik}/>
        </div>
    );
};
export default NowyLicznik;