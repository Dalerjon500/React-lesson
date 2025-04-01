import { useState } from "react";
import { User } from "./type/types";
import RegisterForm from "./components/RegisterForm";
import UsersList from "./components/UsersList";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
    const [userList, setUserList] = useState<User[]>([
        {
            id: 1,
            name: "Dalerjon",
            email: "dalerismatov113.@gamil.com",
            password: "kodlar333",
            confirmPassword: "kodlar333",
        },
        {
            id: 2,
            name: "Bexruz",
            email: "bexruz66@gmail.com",
            password: "kodlar333",
            confirmPassword: "kodlar333"
        },
        {
            id: 3,
            name: "Fidavs",
            email: "firdavs22@gmail.com",
            password: "kodlar333",
            confirmPassword: "kodlar333"
        }
    ]);

    const addUser = (user: User) => {
        const newUser = { ...user, id: userList.length + 1 };
        setUserList([...userList, newUser]);
    }


    const [page, setPage] = useState(1);

    return (
        <div className="container mt-5">
            <button
                onClick={() => setPage(1)}
                className={`btn ${page === 1 ? 'btn-dark' : 'btn-outline-dangernpm '} me-2 btn-lg`}
            >
                Register
            </button>

            <button
                onClick={() => setPage(2)}
                className={`btn ${page === 2 ? 'btn-dark' : 'btn-outline-danger'} btn-lg`}
            >
                Users
            </button>

            {page === 1 && <RegisterForm addUser={addUser} />}
            {page === 2 && <UsersList userList={userList} />}
        </div>
    );
}

export default App;


