import React from "react";

function Chat({ sender, text }) {
    return (
        <div style={{ border: "2px solid black", padding: "10px", marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
            <span>{sender}: {text}</span>
        </div>
    );
}

export default Chat;
