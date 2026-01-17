import React, {useState, useEffect} from "react";

const Tytul: React.FC = () => {
    const [title, setTitle] = useState("");
    useEffect(() => {
        document.title = title;
    }, [title]);
    return (
        <div>
            <h3>Tytuł strony 6.2</h3>
            <input
                type = "text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Wpisz tytuł strony..."
            />
        </div>
    );
};
export default Tytul;