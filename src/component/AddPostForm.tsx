import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
    Box, Button, Typography, Modal, TextField, Divider, IconButton, FormControl,
    InputLabel, Select, MenuItem, OutlinedInput, SelectChangeEvent
} from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { Post } from "../page/Posts";

const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.1)',
        },
        '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.2)',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#4fc3f7',
            boxShadow: `0 0 0 2px rgba(79, 195, 247, 0.3)`
        },
    },
    '& .MuiInputLabel-root': {
        color: 'rgba(255, 255, 255, 0.6)',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#4fc3f7',
    },
    '& .MuiInputBase-input': {
        color: '#ffffff',
    },
    '& .MuiInputBase-input::placeholder': {
        color: 'rgba(255, 255, 255, 0.3)',
    }
};

interface User {
    id: number;
    name: string;
}

interface PostData {
    userId: number | null;
    title: string;
    body: string;
}

interface Props {
    openAdd: boolean;
    onClose: () => void;
    users: User[];
    addPosts(data: PostData): void;
    updatePost: (post: Post) => void;
    selectedPost: Post | null;
}

function AddPostForm({ openAdd, onClose, users, addPosts, updatePost, selectedPost }: Props) {
    const [selectedUser, setSelectedUser] = useState<number | null>(null);
    const [postData, setPostData] = useState({ title: '', body: '' });

    useEffect(() => {
        if (selectedPost) {
            const { userId, id, ...rest } = selectedPost;
            setSelectedUser(userId);
            setPostData(rest);
        } else {
            setSelectedUser(null);
            setPostData({ title: "", body: "" });
        }
    }, [selectedPost, openAdd]);

    const handleUserChange = (event: SelectChangeEvent<number>) => {
        setSelectedUser(event.target.value as number);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPostData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedPost) {
            updatePost({ ...postData, id: selectedPost.id, userId: selectedUser! });
        } else {
            addPosts({ ...postData, userId: selectedUser });
        }
        onClose();
    };

    const isEditMode = Boolean(selectedPost);

    return (
        <Modal
            open={openAdd}
            onClose={onClose}
            aria-labelledby="post-modal-title"
            aria-describedby="post-modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: { xs: '90%', sm: '80%', md: '600px' },
                    bgcolor: '#121212',
                    borderRadius: '20px',
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.5)',
                    p: 4,
                    outline: 'none',
                    transform: openAdd ? 'scale(1)' : 'scale(0.95)',
                    transition: 'all 0.3s ease-in-out',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                component="form"
                onSubmit={handleSubmit}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography
                        id="post-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{
                            color: '#ffffff',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                        }}
                    >
                        {isEditMode ? 'Edit Post' : 'Add New Post'}
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        aria-label="close"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.6)',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                transform: 'rotate(90deg)',
                                color: '#ffffff'
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
                    borderWidth: '1px'
                }} />

                <FormControl fullWidth sx={{ mb: 3, ...textFieldStyles }}>
                    <InputLabel id="user-select-label">Select User</InputLabel>
                    <Select
                        labelId="user-select-label"
                        id="user-select"
                        value={selectedUser !== null ? selectedUser : ''}
                        onChange={handleUserChange}
                        input={<OutlinedInput label="Select User" />}
                        required
                        sx={{
                            '& .MuiSelect-icon': {
                                color: 'rgba(255, 255, 255, 0.6)',
                            }
                        }}
                    >
                        {users.map((user) => (
                            <MenuItem
                                key={user.id}
                                value={user.id}
                                sx={{
                                    backgroundColor: '#121212',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                    }
                                }}
                            >
                                {user.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                }}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Title"
                        variant="outlined"
                        name="title"
                        value={postData.title}
                        onChange={handleInputChange}
                        required
                        sx={textFieldStyles}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Body"
                        variant="outlined"
                        name="body"
                        value={postData.body}
                        onChange={handleInputChange}
                        required
                        multiline
                        rows={4}
                        sx={{
                            ...textFieldStyles,
                            gridColumn: '1 / -1'
                        }}
                    />
                </Box>

                <Divider sx={{
                    my: 3,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: '1px'
                }} />

                <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        startIcon={<FaTimes />}
                        sx={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '12px',
                            px: 3,
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                borderColor: 'rgba(255, 255, 255, 0.4)',
                                color: '#ffffff'
                            },
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            background: `linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)`,
                            borderRadius: '12px',
                            px: 3,
                            color: '#fff',
                            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)',
                            '&:hover': {
                                transform: 'translateY(-1px)',
                                boxShadow: '0 6px 16px rgba(25, 118, 210, 0.6)',
                                background: `linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)`,
                            },
                            transition: 'all 0.2s ease',
                            '&:disabled': {
                                background: 'rgba(255, 255, 255, 0.1)',
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        }}
                    >
                        {isEditMode ? 'Save Changes' : 'Add New Post'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default AddPostForm;