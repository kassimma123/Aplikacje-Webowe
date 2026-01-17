import React, {useState} from 'react';
const Haslo: React.FC = () => {
    const [haslo, setHaslo] = useState("");
    const [powtorzHaslo, setPowtorzHaslo] = useState("");

    const getMessage = () => {
        if (!haslo && !powtorzHaslo) return "Proszę wprowadzić hasło";
        if (haslo !== powtorzHaslo) return "Hasła są niezgodne";
        return "";
    };

    return (
        <div>
            <h3>Hasło 3.2</h3>
            <div>
                Hasło: <input type="text" value={haslo} onChange={(e) => setHaslo(e.target.value)} />
            </div>
            <div>
                Powtórz: <input type={"text"} value={powtorzHaslo} onChange={(e) => setPowtorzHaslo(e.target.value)} />
            </div>
            <div>
                {getMessage()}
            </div>
        </div>
    );
};
export default Haslo;