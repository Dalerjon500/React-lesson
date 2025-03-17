import React, { useState } from "react";
import First from './First';
import Second from './Second';
import Third from './Third';

function App() {
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([
        { id: 1, name: 'Daler', age: 24, work: 'developer' },
        { id: 2, name: 'Firdavs', age: 25, work: 'developer' },
        { id: 3, name: 'Muslima', age: 20, work: 'developer' },
        { id: 4, name: 'Bexruz', age: 23, work: 'developer' },
        { id: 5, name: 'Jahon', age: 25, work: 'developer' },
        { id: 6, name: 'Mahmud', age: 23, work: 'developer' },
        { id: 7, name: 'Shohjahon', age: 25, work: 'developer' },
    ]);

    function addUser(user) {
        setUsers([...users, user]);
    }

    return (
        <div className="container mt-5">
            <button onClick={() => setPage(1)} className="btn btn-primary me-2 btn-lg">First Page</button>
            <button onClick={() => setPage(2)} className="btn btn-success me-2 btn-lg">Second Page</button>
            <button onClick={() => setPage(3)} className="btn btn-danger btn-lg">Third Page</button>

            {
                page === 1 ? <First /> :
                    page === 2 ? <Second addUser={addUser} users={users} setUsers={setUsers} /> :
                        <Third users={users} />
            }
        </div>
    );
}

export default App;

