import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ListaArtykulow from './pages/ListaArtykulow';
import Artykul from './pages/Artykul';
import DodajArtykul from './pages/DodajArtykul';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
                    <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
                    <Link to="/blog" style={{ marginRight: '15px' }}>Blog</Link>
                    <Link to="/dodaj">Dodaj Artykuł</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<ListaArtykulow />} />
                    <Route path="/article/:id" element={<Artykul />} />
                    <Route path="/dodaj" element={<DodajArtykul />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;