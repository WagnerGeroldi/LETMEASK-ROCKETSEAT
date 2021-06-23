//import react, router
import { useParams } from 'react-router-dom'
import { useState, FormEvent, useEffect } from 'react'

//imports objetos do projeto
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

//import de svgs
import logoImg from '../assets/images/logo.svg'

//import sass
import '../styles/room.scss'

//tipagem typescript
type RooomParms = {
    id: string;
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string,
    };
    content: string;
    isAnswered: boolean;
    isHightLighted: boolean;
}>;

type Question = {
    id: string;
    author: {
        name: string,
        avatar: string,
    };
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
}


export function Room() {
    const {user} = useAuth()
    const params = useParams<RooomParms>(); //passar o generic
    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQUestions] = useState<Question[]>([]);
    const [title, setTitle] = useState('');
    const roomId = params.id;

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)

        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions = databaseRoom.questions as FirebaseQuestions;
            const parsedQuestion = Object.entries(firebaseQuestions  ?? {}).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHightLighted,
                    isAnswered: value.isAnswered,
                }
            })
        setTitle(databaseRoom.title);
        setQUestions(parsedQuestion)
        })
    }, [roomId]);


async function handleSendNewQuestion(event: FormEvent) {
    event.preventDefault();
    if ( newQuestion.trim() === '') {
        return;
    }

    if(!user) {
        throw new Error('Você não está logado')
    }

    const questiton = {
        content: newQuestion,
        author: {
            name: user.name,
            avatar: user.avatar
        },
        isHighLighted: false, //conferir se está em destaque
        isAnswered: false    // já está respondida?
    };

    await database.ref(`rooms/${roomId}/questions`).push(questiton)
    setNewQuestion('')
}

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="LetmeAsk" />
                    <RoomCode code={roomId} />
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <form onSubmit={handleSendNewQuestion}>
                    <textarea
                        placeholder="O que você quer perguntar?"
                        onChange = {event => setNewQuestion(event.target.value)}
                        value = {newQuestion}
                    />
                    <div className="form-footer">
                        {user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ): (
                            <span>Para enviar uma pergunta, <button> faça seu login</button>.</span>
                        )}
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>

                {JSON.stringify(questions)}
            </main>
        </div>
    )
}