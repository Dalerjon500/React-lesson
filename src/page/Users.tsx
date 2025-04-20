import { ChangeEvent, useEffect, useState } from "react";
import UserForm from "../component/UserForm";
import UserList from "../component/UserList";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, TextField, Box, Paper, Pagination, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent,
    Typography } from "@mui/material";
import { FaUserPlus, FaSearch} from "react-icons/fa";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../context/Theme";
import Loading from "../component/LoadingForUsers";
import apiClient from "../apiClient/ApiClient";
import useUsers from "../hooks/useUsers";

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}


function Users() {
    const { users, setUsers } = useUsers()
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(5);
    const [totalUsers, setTotalUsers] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setSelectedUser(null);
    };

    function getUsers() {
        setIsLoading(true);
        const url = search.trim() === ""
            ? `/users?_page=${page}&_limit=${limit}`
            : `/users?name_like=${search}&_page=${page}&_limit=${limit}`;

        axios.get(apiClient.defaults.baseURL + url)
            .then((res) => {
                const total = Math.floor(res.headers["x-total-count"] / limit);
                setTotalUsers(total);
                setUsers(res.data);
            })
            .catch((error) => {
                console.log(error);
                toast.error("Error fetching users");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        getUsers()
    }, [page, limit, search]);


    function addUser(data: Omit<User, "id">) {
        const usersCopy = [...users];
        const newUser: User = { ...data, id: users.length + 1 };

        setUsers([...usersCopy, newUser]);

        axios.post("https://jsonplaceholder.typicode.com/users", newUser)
            .then((res) => {
                setUsers([...usersCopy, res.data]);
                toast.success("User saved successfully");
                handleClose();
            })
            .catch((err) => {
                setUsers(usersCopy);
                toast.error(err.message);
            });
    }

    function updateUser(updatedUser: User) {
        const usersCopy = [...users];

        setUsers(users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
        ));

        axios.patch(
            `https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,
            updatedUser
        )
            .then((res) => {
                setUsers(users.map((user) =>
                    user.id === updatedUser.id ? res.data : user
                ));
                toast.success("User updated successfully");
                handleClose();
            })
            .catch((err) => {
                setUsers(usersCopy);
                toast.error(err.message);
            });
    }

    const deleteUser = (id: number) => {
        const usersCopy = [...users];

        setUsers(users.filter((user) => user.id !== id));

        axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(() => {
                toast.success("User deleted successfully");
            })
            .catch((err) => {
                console.error(err);
                setUsers(usersCopy);
                toast.error("Error deleting user");
            });
    };

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
        console.log(event);
        setPage(value);
    };

    const handleLimitChange = (event: SelectChangeEvent<number>) => {
        setLimit(Number(event.target.value));
        setPage(1);
    };

    return (
        <ThemeProvider theme={theme} >
            {isLoading && <Loading />}
            <Box className="main-container container"  >
                <Paper className="paper-container">
                    <Box className="header-container d-flex justify-content-between mb-3">
                        <Typography variant="h4" className="d-flex gap-3">
                            Users
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<FaUserPlus style={{ fontSize: "1rem" }} />}
                            onClick={handleOpen}
                            style={{
                                backgroundColor: "#166534",
                                color: "#ffffff",
                                fontWeight: "bold",
                                borderRadius: "8px",
                                padding: "6px 16px",
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#15803d")}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#166534")}
                        >
                            Add User
                        </Button>

                    </Box>
                    <TextField
                        fullWidth
                        label="Search users..."
                        variant="outlined"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        InputProps={{
                            startAdornment: (
                                <FaSearch
                                    style={{
                                        color: theme.palette.primary.main,
                                        marginRight: "8px",
                                    }}
                                />
                            ),
                        }}
                        className="search-input"
                    />

                    <Box className="filter-pagination-container d-flex justify-content-between mt-4">
                        <FormControl size="small">
                            <InputLabel id="rows-per-page-label" className="input-label">
                                Rows
                            </InputLabel>
                            <Select
                                labelId="rows-per-page-label"
                                value={limit}
                                label="Rows"
                                onChange={handleLimitChange}
                                style={{ minWidth: "120px" }}
                            >
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                            </Select>
                        </FormControl>

                        <Pagination
                            count={totalUsers}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                            shape="rounded"
                        />
                    </Box>

                    {!isLoading && (
                        <UserList
                            users={users}
                            deleteUser={deleteUser}
                            handleEdit={handleEdit}
                            selectedUser={(user: User) => setSelectedUser(user)}
                        />
                    )}
                    <UserForm
                        open={open}
                        onClose={handleClose}
                        addUser={addUser}
                        updateUser={updateUser}
                        selectedUser={selectedUser}
                    />
                </Paper>
            </Box>
        </ThemeProvider>

    );
}

export default Users;