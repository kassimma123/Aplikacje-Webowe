import React, {useState} from "react";

const Aktualizacja:React.FC = () => {
    const [produkt, setProdukt] = useState({nazwa: "Pomidor", cena: 50});

    const zmienCene = () => {
        setProdukt(prev => ({
            ...prev, cena: 100
        }));
    };

    return (
        <div>
            <h3>aktualizacja 4.2</h3>
            <div>Aktualnie {produkt.nazwa} kosztuje {produkt.cena}</div>
            <button onClick = {zmienCene}>Zmień cenę</button>
        </div>
    );
};
export default Aktualizacja;