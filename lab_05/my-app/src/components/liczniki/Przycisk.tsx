import React from "react";

interface PrzyciskProps{
    inkrementuj: () => void;
}

const Przycisk: React.FC<PrzyciskProps> = ({ inkrementuj}) => {
    return <button onClick={inkrementuj}>Dodaj (2.2)</button>;
};
export default Przycisk;