import { useState } from "react";

export function Button() {

const [contador, setContador] = useState(0)

    function incremento() {
        setContador(contador + 1)
    }

    return (
        <button onClick={incremento}> {contador} </button>
    )
}
