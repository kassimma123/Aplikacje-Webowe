import React from 'react';

const Ternary: React.FC = () => {
    const a: boolean = true;
    const b: boolean = false;
    return(
        <div>
            <h3>Ternary 4.1</h3>
            <div>
                {a ? "stwierdzenie a jest prawdziwe" : "stwierdzenie a jest fałszywe"}
            </div>

            <div>
                {b ? "stwierdzenie b jest prawdziwe" : "stwierdzenie b jest fałszywe"}
            </div>
        </div>
    );
};
export default Ternary;