import React, {useState} from "react";

const Logowanie: React.FC = () => {
    const [nazwa, setNazwa] = useState("");
    const [haslo, setHaslo] = useState("");
    const [powtorzHaslo, setPowtorzHaslo] = useState("");

    //wyłączenie przycisku --> którekolwiek pole puste
    const isDisabled = !nazwa || !haslo || !powtorzHaslo;

    const handleLogin = () => {
        if(haslo !== powtorzHaslo){
            alert("Hasła nie są zgodne");
        } else {
            alert("Zalogowanie poprawne");
        }
    };

    return (
        <div>
            <h3>Logowanie 3.3</h3>
            <div>
                Nazwa: <input type = "text" value={nazwa} onChange={(e) => setNazwa(e.target.value)} />
            </div>
            <div>
                Hasło: <input type="text" value={haslo} onChange={(e) => setHaslo(e.target.value)} />
            </div>
            <div>
                Powtórz: <input type="text" value={powtorzHaslo} onChange={(e)=> setPowtorzHaslo(e.target.value)} />
            </div>

            <button disabled={isDisabled} onClick={handleLogin}>
                Logowanie
            </button>
        </div>
    );

};
export default Logowanie;