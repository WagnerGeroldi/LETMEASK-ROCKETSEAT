// import react, router
import { ReactNode } from 'react'

//import sass
import '../styles/question.scss'

//tipagem typescript
type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
}


export function Question(props: QuestionProps) {
    return(
        <div className="question">
            <p>
                {props.content}
            </p>
            <footer>
                <div className="user-info">
                    <img src={props.author.avatar} alt={props.author.name} />
                    <span>{props.author.name}</span>
                </div>
                <div>
                    {props.children}
                </div>
            </footer>
        </div>

    )
}