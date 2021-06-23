//import react, router
import { useParams } from 'react-router-dom'
//imports objetos do projeto
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'

//import de svgs
import logoImg from '../assets/images/logo.svg'

//import sass
import '../styles/room.scss'

//tipagem typescript
type RooomParms = {
    id: string;
}


export function Room() {
    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="LetmeAsk" />
                    <RoomCode code={} />
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
                </div>

                <form >
                    <textarea 
                    placeholder="O que você quer perguntar?"
                    />
                <div className="form-footer">
                    <span>Para enviar uma pergunta, <button> faça seu login</button>.</span>
                    <Button type="submit">Enviar pergunta</Button>
                </div>
                </form>
            </main>
        </div>
    )
}