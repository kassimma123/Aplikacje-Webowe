import React, { useState } from 'react';

interface Student {
    imie: string,
    nazwisko: string;
    rocznik: number;
}

interface DodawanieProps {
    onAdd: (student: Student)=> void;
}

const Dodawanie: React.FC<DodawanieProps> = ({onAdd}) => {
    const [imie, setImie] = useState("");
    const [nazwisko, setNazwisko] = useState("");
    const[rocznik, setRocznik] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        //walidacja
        if (!imie || !nazwisko || !rocznik){
            alert("Wypełnij pola");
            return;
        }

        const rocznikNum = parseInt(rocznik);
        if (isNaN(rocznikNum)){
            alert("Rocznik musi być liczbą");
            return;
        }

        onAdd({imie, nazwisko, rocznik: rocznikNum});

        //wyczysszczenie formularza
        setImie("");
        setNazwisko("");
        setRocznik("");
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
            <input
                placeholder="Imię"
                value = {imie}
                onChange={e => setImie(e.target.value)}
            />
            <input
                placeholder="Nazwisko"
                value = {nazwisko}
                onChange={e => setNazwisko(e.target.value)}
            />
            <input
                placeholder="Rocznik"
                value={rocznik}
                onChange={e => setRocznik(e.target.value)}
            />
            <button type="submit">Dodaj</button>
        </form>
    );
};

export default Dodawanie;