
//import react e router
import { useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

//imports objetos do projeto
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/Button'
import { database } from '../services/firebase';

//import svgs
import googleIconImg from '../assets/images/google-icon.svg';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

//import sass
import '../styles/auth.scss'

export function Home() {

    const history = useHistory();
    const { user, signInWithGoogle } = useAuth()
    const [roomCode, SetRoomCode] = useState('');

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }

        history.push('/rooms/new')

    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Esta sala não existe!');
            return;
        }

        if(roomRef.val().endedAt) {
            alert('Esta sala foi encerrada pelo Admin')
            return
        }

        history.push(`/rooms/${roomCode}`)
    }


    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração perguntas e respostas" />
                <strong>Crie Salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">
                        ou entre em uma sala
                    </div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => SetRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}