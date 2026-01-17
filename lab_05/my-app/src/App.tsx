import './App.css'

import Koszyk from './components/koszyk/Koszyk';
import NowyKoszyk from './components/koszyk/NowyKoszyk';
import Licznik from './components/liczniki/Licznik';
import NowyLicznik from './components/liczniki/NowyLicznik';
import Formularz from './components/formularze/Formularz';
import Haslo from './components/formularze/Haslo';
import Logowanie from './components/formularze/Logowanie';
import Aktualizacja from "./inne/Aktualizacja.tsx";
import Ternary from "./inne/Ternary.tsx";
import Studenci from "./components/studenci/Studenci.tsx";
import StudentManager from "./components/studenci/StudentManager.tsx";
import Tytul from "./components/efekty/Tytul.tsx";
import Odliczanie from "./components/efekty/Odliczanie.tsx";

function App(){
    return(
        <div className="App">
            <h1>Lab 05</h1>
            <section>
                <h2>zadanie 1: koszyk</h2>
                <Koszyk />
                <NowyKoszyk />
            </section>
            <hr/>

            <section>
                <h2>Zadanie 2: liczniki</h2>
                <Licznik />
                <NowyLicznik />
            </section>
            <hr/>

            <section>
                <h2>Zadanie 3: formularze</h2>
                <Formularz />
                <Haslo />
                <Logowanie />
            </section>
            <hr/>
            <section>
                <h2>Zadanie 4: inne</h2>
                <Aktualizacja />
                <Ternary />
            </section>
            <hr/>
            <section>
                <h2>Zadanie 5: studenci</h2>
                <Studenci />
                <StudentManager />
            </section>
            <hr/>
            <section>
                <h2>Zadanie 6: efekty</h2>
                <Licznik />
                <Tytul />
                <Odliczanie />
            </section>
            <hr/>
        </div>
    )
}
export default App