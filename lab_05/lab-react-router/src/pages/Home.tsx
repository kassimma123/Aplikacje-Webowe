import React from 'react';
import { Link } from 'react-router-dom';
import Licznik from '../components/Licznik';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Strona Główna</h1>
            <p>Witaj w aplikacji blogowej!</p>

            <nav>
                <Link to="/blog">Przejdź do bloga</Link>
            </nav>

            <hr />
            <Licznik />
        </div>
    );
};

export default Home;