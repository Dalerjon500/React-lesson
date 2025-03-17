import React from "react";

function Sidebar({ users }) {
    return (
        <div style={{ width: "250px", border: "2px solid black", padding: "10px", marginRight: "10px" }}>
            <h3>Users</h3>
            {users.map((user, index) => (
                <div key={index} style={{ border: "2px solid black", padding: "5px", marginBottom: "10px" }}>
                    {user}
                </div>
            ))}
        </div>
    );
}

export default Sidebar;
