import { Box, Divider, IconButton, Modal, TextField, Typography, Button } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { FieldValues, useForm } from "react-hook-form";
import { CommentType } from "../page/Comments";

interface Props {
    open: boolean;
    onClose: () => void;
    addComments: (newComment: Omit<CommentType, "id" | "postId" | "userId">) => void;
}

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
            boxShadow: `0 0 0 2px rgba(79, 195, 247, 0.3)`,
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

function AddCommentForm({ open, onClose, addComments }: Props) {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: '',
            email: '',
            body: '',
        }
    });

    const submit = (data: FieldValues) => {
        const newComment: Omit<CommentType, "id" | "postId" | "userId"> = {
            name: data.name,
            email: data.email,
            body: data.body
        };
        addComments(newComment);
        reset();
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
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: { xs: '90%', sm: '80%', md: '600px' },
                    bgcolor: '#121212',
                    borderRadius: '16px',
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.5)',
                    p: 4,
                    outline: 'none',
                    transform: open ? 'scale(1)' : 'scale(0.95)',
                    transition: 'all 0.3s ease-in-out',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                component="form"
                onSubmit={handleSubmit(submit)}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
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
                        }}
                    >
                        Add Comment
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

                <Box sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    '& .MuiTextField-root': {
                        mb: 0
                    }
                }}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Name"
                        variant="outlined"
                        type="text"
                        sx={textFieldStyles}
                        {...register('name', { required: true })}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        variant="outlined"
                        type="email"
                        sx={textFieldStyles}
                        {...register('email', { required: true })}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Body"
                        variant="outlined"
                        multiline
                        rows={4}
                        {...register('body', { required: true })}
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
                        Add New Comment
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default AddCommentForm;