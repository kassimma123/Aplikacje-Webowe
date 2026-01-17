import React, { useState } from 'react';
import Dodawanie from './Dodawanie';

interface Student {
    imie: string;
    nazwisko: string;
    rocznik: number;
}

const StudentManager: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([
        { imie: "Jan", nazwisko: "Kowalski", rocznik: 1999 },
        { imie: "Anna", nazwisko: "Nowak", rocznik: 2000 },
        { imie: "Piotr", nazwisko: "Zieliński", rocznik: 1998 },
    ]);

    const handleAddStudent = (newStudent: Student) => {
        setStudents([...students, newStudent]);
    };

    return (
        <div>
            <h3>Student Manager 5.2</h3>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Rocznik</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index)=>(
                        <tr key={index}>
                            <td>{student.imie}</td>
                            <td>{student.nazwisko}</td>
                            <td>{student.rocznik}</td>
                        </tr>
                        ))}
                </tbody>
            </table>
            <Dodawanie onAdd={handleAddStudent} />
        </div>
    );
};

export default StudentManager;