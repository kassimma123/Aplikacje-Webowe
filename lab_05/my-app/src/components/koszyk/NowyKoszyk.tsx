import React from 'react';
import Produkt from './Produkt.tsx';

const NowyKoszyk: React.FC = () => {
    const Produkty = ["Jabłko", "Gruszka", "Śliwka", "Malina", "Banan"];

    return (
        <div>
            <h3>Nowy Koszyk 1.2</h3>
            {Produkty.map((nazwa, index) => (
                <Produkt key={index} nazwa={nazwa} />
            ))}
        </div>
    );
};

export default NowyKoszyk;