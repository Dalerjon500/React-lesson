import { User } from "../page/Posts";
import React from "react";
import {FormControl,InputLabel,MenuItem,Select,SelectChangeEvent} from "@mui/material";

interface Props {
    users: User[];
    selectedUser: number | "";
    setSelectedUser: React.Dispatch<React.SetStateAction<number | "">>;
}

function UserSelect({ users, selectedUser, setSelectedUser }: Props) {
    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        setSelectedUser(value === "" ? "" : Number(value));
    };

    return (
        <FormControl fullWidth className="mb-5">
            <InputLabel id="user-select-label">Filter by User</InputLabel>
            <Select
                labelId="user-select-label"
                id="user-select"
                value={selectedUser === "" ? "" : selectedUser.toString()}
                onChange={handleChange}
                label="Filter by User"
            >
                <MenuItem value="">All Users</MenuItem>
                {users.map((user) => (
                    <MenuItem key={user.id} value={user.id.toString()}>
                        {user.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}



export default UserSelect;