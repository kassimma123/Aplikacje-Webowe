import React from 'react';
import Produkt from './Produkt.tsx';

const Koszyk: React.FC = () => {
    return (
        <div>
            <h3>Koszyk 1.1</h3>
            <Produkt nazwa="Jabłko" />
            <Produkt nazwa="Gruszka" />
            <Produkt nazwa="Śliwka" />
            <Produkt nazwa="Malina" />
            <Produkt nazwa="Banan" />
        </div>
    );
};

export default Koszyk;