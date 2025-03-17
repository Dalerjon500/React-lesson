import React from "react";
import Chat from "./Chat";

function Content({ messages }) {
    return (
        <div style={{ flex: 1, border: "2px solid black", padding: "10px" }}>
            {messages.map((msg, index) => (
                <Chat key={index} sender={msg.sender} text={msg.text} />
            ))}
        </div>
    );
}

export default Content;
