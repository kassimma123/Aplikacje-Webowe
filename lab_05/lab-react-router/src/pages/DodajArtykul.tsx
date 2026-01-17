import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DodajArtykul: React.FC = () => {
    const [tytul, setTytul] = useState('');
    const [tresc, setTresc] = useState('');
    const navigate = useNavigate();

    const handleDodaj = () => {

        const storedArticles = localStorage.getItem('artykuly');
        const articles = storedArticles ? JSON.parse(storedArticles) : [];


        const newArticle = {
            id: Date.now(),
            title: tytul,
            content: tresc
        };

        articles.push(newArticle);
        localStorage.setItem('artykuly', JSON.stringify(articles));

        navigate('/blog');
    };

    return (
        <div>
            <h2>Dodaj nowy artykuł</h2>
            <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="Tytuł"
                    value={tytul}
                    onChange={(e) => setTytul(e.target.value)}
                />
                <textarea
                    placeholder="Treść"
                    value={tresc}
                    onChange={(e) => setTresc(e.target.value)}
                />
                <button onClick={handleDodaj}>DODAJ</button>
            </div>
        </div>
    );
};

export default DodajArtykul;