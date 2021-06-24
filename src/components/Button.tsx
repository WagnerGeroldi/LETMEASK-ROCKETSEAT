
//imports objetos do projeto
import {ButtonHTMLAttributes} from 'react'
import '../styles/button.scss'

//tipagem typescript
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined? : boolean
};


export function Button({isOutlined = false,  ...props} : ButtonProps) {

    return (
        <button 
        className={`button ${isOutlined ? 'outlined' : ''}`} 
        {...props}/>
    )
}
