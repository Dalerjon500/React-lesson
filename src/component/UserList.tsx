import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Modal, Button } from "@mui/material";
import { User } from "../page/Users";
import { FaTrashAlt, FaEdit, FaUsers, FaUserSlash, FaTimes, FaTrash, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import { theme } from "../context/Theme";
import { useState } from "react";

interface Props {
    users: User[];
    deleteUser: (id: number) => void;
    selectedUser: (user: User) => void;
    handleEdit: (user: User) => void;
}

function UserList({ users, deleteUser, selectedUser, handleEdit }: Props) {
    const [open, setOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const handleOpen = (user: User) => {
        setUserToDelete(user);
        setOpen(true);
    };

    const handleClose = () => {
        setUserToDelete(null);
        setOpen(false);
    };

    const handleDeleteUser = () => {
        if (userToDelete) {
            deleteUser(userToDelete.id);
            handleClose();
        }
    };

    return (
        <Box sx={{
            width: '100%',
            p: { xs: 2, md: 3 },
            backgroundColor: '#121212',
            minHeight: '100vh'
        }}>
            <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{
                    color: '#ffffff',
                    fontWeight: 600,
                    mb: 4,
                    pt: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                }}
            >
                <FaUsers style={{ color: theme.palette.primary.main }} />
                User List
            </Typography>

            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: '#1e1e1e',
                    '& .MuiTable-root': {
                        overflowX: 'auto'
                    }
                }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="user table">
                    <TableHead sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        '& .MuiTableCell-root': {
                            fontWeight: 600,
                            color: '#ffffff',
                            fontSize: '0.95rem',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                        }
                    }}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{
                                    '&:nth-of-type(even)': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.03)'
                                    },
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.07)',
                                        transform: 'scale(1.002)',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                                    },
                                    transition: 'all 0.2s ease',
                                    '& .MuiTableCell-root': {
                                        color: '#ffffff',
                                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                                    }
                                }}
                            >
                                <TableCell>{user.id}</TableCell>
                                <TableCell sx={{ fontWeight: 500 }}>{user.name}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell align="center">
                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                        <IconButton
                                            onClick={() => handleOpen(user)}
                                            sx={{
                                                color: '#ff6b6b',
                                                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 107, 107, 0.2)',
                                                    transform: 'scale(1.1)'
                                                },
                                                transition: 'all 0.2s ease',
                                                p: 1.5
                                            }}
                                        >
                                            <FaTrashAlt size={16} />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => { selectedUser(user); handleEdit(user) }}
                                            sx={{
                                                color: '#FF9E2C',
                                                backgroundColor: 'rgba(255, 158, 44, 0.1)',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 158, 44, 0.2)',
                                                    transform: 'scale(1.1)'
                                                },
                                                transition: 'all 0.2s ease',
                                                p: 1.5
                                            }}
                                        >
                                            <FaEdit size={16} />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {users.length === 0 && (
                <Paper sx={{
                    p: 4,
                    mt: 3,
                    textAlign: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <FaUserSlash size={48} style={{
                        color: theme.palette.primary.main,
                        marginBottom: '16px',
                        opacity: 0.7
                    }} />
                    <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        No users found
                    </Typography>
                </Paper>
            )}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ backdropFilter: 'blur(4px)' }}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: '#1e1e1e',
                    boxShadow: 24,
                    p: 0,
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 107, 139, 0.2)',
                    overflow: 'hidden',
                    outline: 'none'
                }}>
                    <Box sx={{
                        backgroundColor: 'rgba(255, 107, 139, 0.1)',
                        padding: '20px',
                        borderBottom: '1px solid rgba(255, 107, 139, 0.2)',
                        textAlign: 'center'
                    }}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{
                                color: '#ff6b6b',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}
                        >
                            <FaExclamationTriangle style={{ fontSize: '1.2rem' }} />
                            Confirm Deletion
                        </Typography>
                    </Box>

                    <Box sx={{ p: 3 }}>
                        <Typography
                            id="modal-modal-description"
                            sx={{
                                mt: 1,
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontSize: '1rem',
                                textAlign: 'center'
                            }}
                        >
                            Are you sure you want to delete this user? This action cannot be undone.
                        </Typography>

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '16px',
                            marginTop: '32px'
                        }}>
                            <Button
                                variant="contained"
                                onClick={handleDeleteUser}
                                startIcon={<FaTrash />}
                                sx={{
                                    bgcolor: '#ff6b6b',
                                    color: 'white',
                                    borderRadius: '8px',
                                    px: 3,
                                    py: 1,
                                    fontWeight: 500,
                                    textTransform: 'none',
                                    '&:hover': {
                                        bgcolor: '#ff5252',
                                        boxShadow: '0 2px 8px rgba(255, 107, 139, 0.5)'
                                    }
                                }}
                            >
                                Delete
                            </Button>

                            <Button
                                variant="outlined"
                                onClick={handleClose}
                                startIcon={<FaTimes />}
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    borderColor: 'rgba(255, 255, 255, 0.2)',
                                    borderRadius: '8px',
                                    px: 3,
                                    py: 1,
                                    fontWeight: 500,
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        borderColor: 'rgba(255, 255, 255, 0.3)',
                                        color: 'rgba(255, 255, 255, 0.9)'
                                    }
                                }}
                            >
                                Cancel
                            </Button>
                        </Box>

                        <Box sx={{
                            marginTop: '24px',
                            paddingTop: '16px',
                            borderTop: '1px dashed rgba(255, 255, 255, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}>
                            <FaInfoCircle style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                                This will permanently remove all user data
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

export default UserList;