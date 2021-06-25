//import react, router
import { useEffect, useState } from 'react'

//imports objetos do projeto
import { database } from '../services/firebase'

//import sass
import '../styles/room.scss'
import { useAuth } from './useAuth';

//tipagem typescript
type QuestionType = {
    id: string;
    author: {
        name: string,
        avatar: string,
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number;
    likeId: string | undefined;
}
type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string,
    };
    content: string;
    isAnswered: boolean;
    isHightlighted: boolean;
    likes: Record<string, {
    authorId: string;
    }>
}>;



export function useRoom(roomId: String) {
    const { user } = useAuth();
    const [questions, setQUestions] = useState<QuestionType[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)

        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions = databaseRoom.questions as FirebaseQuestions;
            const parsedQuestion = Object.entries(firebaseQuestions ?? {}).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHightlighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
                }
            })
            setTitle(databaseRoom.title);
            setQUestions(parsedQuestion)
        })

        return () => {
            roomRef.off('value');
        }
    }, [roomId, user?.id]);
    return { questions, title }
}