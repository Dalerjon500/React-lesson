import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { User } from "../page/Users";
import { Box, Button, Typography, Modal, TextField, Divider, IconButton } from "@mui/material";
import { FaUserEdit, FaUserPlus, FaTimes, FaSave } from "react-icons/fa";
import { theme } from "../context/Theme";

const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '10px',
        '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.1)',
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.light,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 0 2px ${theme.palette.primary.light}`
        },
    },
    '& .MuiInputLabel-root': {
        color: 'rgba(255, 255, 255, 0.7)',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: theme.palette.primary.main,
    },
    '& .MuiInputBase-input': {
        color: '#ffffff',
    },
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    '& .MuiInputBase-input::placeholder': {
        color: 'rgba(255, 255, 255, 0.3)',
        opacity: 1,
    }
};

interface Props {
    open: boolean;
    onClose: () => void;
    addUser: (data: Omit<User, "id">) => void;
    updateUser: (user: User) => void;
    selectedUser: User | null;
}

function UserForm({ open, onClose, addUser, updateUser, selectedUser }: Props) {
    const [formData, setFormData] = useState<Omit<User, "id">>({
        name: "",
        username: "",
        email: "",
        phone: ""
    });

    useEffect(() => {
        if (selectedUser) {
            const { id, ...rest } = selectedUser;
            console.log(`Selected user ID: ${id}`);
            setFormData(rest);
        } else {
            setFormData({
                name: "",
                username: "",
                email: "",
                phone: ""
            });
        }
    }, [selectedUser]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (selectedUser) {
            updateUser({ ...formData, id: selectedUser.id });
        } else {
            addUser(formData);
        }
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="user-modal-title"
            aria-describedby="user-modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(5px)',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: { xs: '90%', sm: '80%', md: '600px' },
                    bgcolor: '#121212',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                    p: 4,
                    outline: 'none',
                    transform: open ? 'scale(1)' : 'scale(0.9)',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    '&:before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '120px',
                        height: '120px',
                        background: 'radial-gradient(circle, rgba(100, 100, 255, 0.2) 0%, transparent 70%)',
                        transform: 'translate(30%, -30%)',
                        zIndex: 0
                    },
                    '&:after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '120px',
                        height: '120px',
                        background: 'radial-gradient(circle, rgba(255, 100, 100, 0.2) 0%, transparent 70%)',
                        transform: 'translate(-30%, 30%)',
                        zIndex: 0
                    }
                }}
                component="form"
                onSubmit={handleSubmit}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" position="relative" zIndex={1}>
                    <Typography
                        id="user-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{
                            color: '#ffffff',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            pl: 1
                        }}
                    >
                        {selectedUser ? (
                            <>
                                <FaUserEdit style={{
                                    color: theme.palette.primary.main,
                                    fontSize: '1.4rem'
                                }} />
                                Edit User
                            </>
                        ) : (
                            <>
                                <FaUserPlus style={{
                                    color: theme.palette.primary.main,
                                    fontSize: '1.4rem'
                                }} />
                                Add New User
                            </>
                        )}
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        aria-label="close"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                color: theme.palette.primary.main,
                                transform: 'rotate(90deg)'
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <FaTimes style={{ fontSize: '1.2rem' }} />
                    </IconButton>
                </Box>

                <Divider sx={{
                    my: 3,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    zIndex: 1
                }} />

                <Box sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    '& .MuiTextField-root': {
                        mb: 0
                    },
                    position: 'relative',
                    zIndex: 1
                }}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Name"
                        variant="outlined"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        sx={textFieldStyles}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Username"
                        variant="outlined"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        sx={textFieldStyles}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        variant="outlined"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        sx={textFieldStyles}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Phone"
                        variant="outlined"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        sx={textFieldStyles}
                    />
                </Box>

                <Divider sx={{
                    my: 3,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    zIndex: 1
                }} />

                <Box display="flex" justifyContent="flex-end" gap={2} position="relative" zIndex={1}>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        startIcon={<FaTimes />}
                        sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '10px',
                            px: 3,
                            '&:hover': {
                                borderColor: theme.palette.primary.main,
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                color: theme.palette.primary.main
                            },
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        startIcon={selectedUser ? <FaSave /> : <FaUserPlus />}
                        sx={{
                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                            borderRadius: '10px',
                            px: 3,
                            color: '#fff',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4)',
                                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                            },
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {selectedUser ? "Update User" : "Add User"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default UserForm;