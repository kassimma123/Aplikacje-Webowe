import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Artykul: React.FC = () => {
    const { id } = useParams(); // To jest zawsze tekst (string)

    const storedArticles = localStorage.getItem('artykuly');
    const articles = storedArticles ? JSON.parse(storedArticles) : [];

    const article = articles.find((art: any) => art.id == id);

    if (!article) {
        return (
            <div>
                <h2>Nie znaleziono artykułu :(</h2>
                <p>Szukane ID: {id}</p>
                <p>Dostępne ID w bazie: {articles.map((a: any) => a.id).join(", ")}</p>
                <Link to="/blog">Wróć do listy</Link>
            </div>
        );
    }

    return (
        <div>
            <h1>{article.title}</h1>
            <p style={{ whiteSpace: 'pre-wrap' }}>{article.content}</p>
            <hr />
            <Link to="/blog">Powrót do listy</Link>
        </div>
    );
};

export default Artykul;