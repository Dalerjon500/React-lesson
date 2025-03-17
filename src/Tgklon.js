import React from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Header from "./Header";
import Chat from "./Chat";

function App() {
    const users = ["User 1", "User 2", "User 3", "User 4", "User 5","User 6", "User 7"];
    const messages = [
        {text:"Salom yaxshimisiz" },
        {text:"Yaxshiman raxmat" }
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", border: "2px solid black", padding: "10px" }}>
            <Header />
            <div style={{ display: "flex", flex: 1 }}>
                <Sidebar users={users} />
                <Content messages={messages} />
                <Chat>

                </Chat>
            </div>
        </div>
    );
}

export default App;