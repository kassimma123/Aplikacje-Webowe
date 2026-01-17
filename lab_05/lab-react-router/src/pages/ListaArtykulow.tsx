import React from 'react';
import { Link } from 'react-router-dom';

const ListaArtykulow: React.FC = () => {
    const storedArticles = localStorage.getItem('artykuly');
    const articles = storedArticles ? JSON.parse(storedArticles) : [];

    return (
        <div>
            <h2>Blog - Lista artykułów</h2>
            {articles.length === 0 ? <p>Brak artykułów. Dodaj pierwszy!</p> : (
                <ul>
                    {articles.map((art: any) => (
                        <li key={art.id}>
                            {/* Link do konkretnego artykułu */}
                            <Link to={`/article/${art.id}`}>{art.title}</Link>
                        </li>
                    ))}
                </ul>
            )}
            <div style={{ marginTop: '20px' }}>
                <Link to="/dodaj" style={{ padding: '10px', background: '#eee' }}>+ Dodaj nowy artykuł</Link>
            </div>
        </div>
    );
};
export default ListaArtykulow;