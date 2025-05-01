
import useContextPro from '../../hooks/useContextPro';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, CircularProgress, Box } from '@mui/material';
import { RiCloseLargeFill } from "react-icons/ri";

interface Props {
    open: boolean;
    onClose: () => void;
    handleEdit: (data: FormData) => Promise<boolean>;
}

type FormData = {
    name: string;
    email: string;
};

function ProfileForm({ open, onClose, handleEdit }: Props) {
    const { state: { user }} = useContextPro();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();

    useEffect(() => {
        if (user) {
            reset({
                name: user.name || '',
                email: user.email || ''
            });
        }
    }, [user, reset]);

    const onSubmit = async (data: FormData) => {
        try {
            await handleEdit(data);
            onClose();
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)'
                }
            }}
        >
            <DialogTitle sx={{
                bgcolor: 'primary.main',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 2,
                px: 3
            }}>
                <Box component="span" sx={{ fontSize: '1.25rem', fontWeight: 500 }}>
                    Edit Profile
                </Box>
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={onClose}
                    disabled={isSubmitting}
                    sx={{
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                    }}
                >
                    <RiCloseLargeFill />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent sx={{ py: 3, px: 3 }}>
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            variant="outlined"
                            margin="normal"
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            {...register('name')}
                            InputProps={{
                                sx: {
                                    borderRadius: 2,
                                    '& fieldset': {
                                        borderWidth: '1px !important'
                                    }
                                }
                            }}
                        />
                    </Box>

                    <Box sx={{ mb: 1 }}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            variant="outlined"
                            margin="normal"
                            type="email"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            {...register('email')}
                            InputProps={{
                                sx: {
                                    borderRadius: 2,
                                    '& fieldset': {
                                        borderWidth: '1px !important'
                                    }
                                }
                            }}
                        />
                    </Box>
                </DialogContent>

                <DialogActions sx={{ px: 3, py: 2 }}>
                    <Button
                        onClick={onClose}
                        disabled={isSubmitting}
                        sx={{
                            px: 3,
                            py: 1,
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'grey.400',
                            color: 'text.primary',
                            '&:hover': {
                                bgcolor: 'grey.100'
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant="contained"
                        sx={{
                            px: 3,
                            py: 1,
                            borderRadius: 2,
                            boxShadow: 'none',
                            '&:hover': {
                                boxShadow: 'none',
                                bgcolor: 'primary.dark'
                            }
                        }}
                    >
                        {isSubmitting ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Save Changes'
                        )}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default ProfileForm;
