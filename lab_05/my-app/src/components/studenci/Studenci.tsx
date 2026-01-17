import React from 'react';

//def interfejsu
interface Student {
    imie: string;
    nazwisko: string;
    rocznik: number;
}

const Studenci: React.FC = () => {
    const Students: Student[] = [
        {imie: "Radosław", nazwisko: "Masło", rocznik: 1999},
        {imie: "Miłosław", nazwisko: "Pietruszka", rocznik: 2001},
        {imie: "Piotr", nazwisko: "Zieliński", rocznik: 2005}
    ];
    return (
        <div>
            <h3>Studenci 5.1</h3>
            <table border={1}>
                <thead>
                <tr>
                    <th>imie</th>
                    <th>nazwisko</th>
                    <th>rocznik</th>
                </tr>
                </thead>
                <tbody>
                {Students.map((student, index)=>(
                    <tr key={index}>
                        <td>{student.imie}</td>
                        <td>{student.nazwisko}</td>
                        <td>{student.rocznik}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
export default Studenci;