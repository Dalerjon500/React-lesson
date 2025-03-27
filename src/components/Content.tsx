import { FormEvent, useState,useRef } from "react"
import { User } from "../App"

interface Props {
    selectedUser: User | null
}

interface Message {
    id: number,
    from: number,
    to: number,
    text: string,
    dateTime: string
}

function Content(props: Props) {

    const element = useRef<HTMLDivElement>(null)

    const [messages, setMessages] = useState<Message[]>([
        { id: 1, from: 1, to: 2, text: "hello", dateTime: "2023-04-23 14:00:00" },
        { id: 2, from: 1, to: 2, text: "javob berrr Bexruz", dateTime: "2023-04-23 14:01:00" },
        { id: 3, from: 2, to: 1, text: "Endi uyga keldim , hozir shoshmay turing ustoz", dateTime: "2023-04-23 14:03:00" },
        { id: 4, from: 1, to: 3, text: "Daler tezzz vazifani tashla", dateTime: "2023-04-23 14:20:00" },
        { id: 5, from: 3, to: 1, text: "Ustoz tashladimkuuu olov olov olov", dateTime: "2023-04-24 14:20:00" },
    ])
    const [text, setText] = useState<string>("")

   

    function getFormattedDateTime() {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(now.getDate()).padStart(2, '0');

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    function sendMessage(e: FormEvent) {
        e.preventDefault()
        let newMessage: Message = {
            id: messages.length + 1,
            from: 1,
            to: props.selectedUser?.id || 1,
            text: text,
            dateTime: getFormattedDateTime()
        }
        if (text !== '') {
            setMessages([...messages, newMessage])
            setText('')
        }
    }

    return (
        <div className='content' >
            <header className="header" >
                <h3>{props.selectedUser?.userName} </h3>
                <p>{props.selectedUser?.phoneNumber}    </p>
            </header>
            <div ref={element}  className="chat">
                <ul>
                    {
                        messages.filter(item => (item.from === 1 && item.to === props.selectedUser?.id) || (item.from === props.selectedUser?.id && item.to === 1))
                            .map((message) => <li className={`message ${(message.from === 1) && "right"}`} key={message.id} >
                                {message.text}
                                <span className="date" >{message.dateTime}</span>
                            </li>)
                    }
                </ul>
            </div>
            <footer>
                <form onSubmit={sendMessage} >
                    <input value={text} onChange={(e) => setText(e.target.value)} placeholder="enter message" type="text" />
                    <button  >send</button>
                </form>
            </footer>
        </div>
    )
}

export default Content