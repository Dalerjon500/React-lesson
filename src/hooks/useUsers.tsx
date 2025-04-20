import { useEffect, useState } from "react"
import { User } from "../page/Users"
import apiClient from "../apiClient/ApiClient";


function useUsers() {

    const [users, setUsers] = useState<User[]>([])


    useEffect(() => {
        apiClient.get(`/users`).then((res) =>{
            setUsers(res.data)
        })
    }, []);

    return {
        users, setUsers
    }
}

export default useUsers;