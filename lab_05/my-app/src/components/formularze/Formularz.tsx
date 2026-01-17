import React, {useState} from 'react';

const Formularz: React.FC = () => {
    const [tekst, setTekst] = useState<string>("");
    return (
        <div>
            <h3>Formularz 3.1</h3>
            <input
                type="text"
                value={tekst}
                onChange={e => setTekst(e.target.value)}
                />
            <div>{tekst}</div>
        </div>
    );
};
export default Formularz;
