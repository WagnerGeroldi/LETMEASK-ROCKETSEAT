
//imports objetos do projeto
import {ButtonHTMLAttributes} from 'react'
import '../styles/button.scss'

//tipagem typescript
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>


export function Button(props: ButtonProps) {

    return (
        <button className="button" {...props}/>
    )
}
