//import react, router

//imports objetos do projeto

//import de svgs
import copyImg from '../assets/images/copy.svg';

//import sass
import '../styles/room-code.scss';

//tipagem typescript
type RoomCodeProps = {
    code: string;
}

function copyRoomCodeToCplipboard(props: RoomCodeProps) {
    navigator.clipboard.writeText(props.code)
}


export function RoomCode() {
    return (
        <button className="room-code" onClick={copyRoomCodeToCplipboard}>
            <div>
                <img src={copyImg} alt="Copy RoomCode" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}