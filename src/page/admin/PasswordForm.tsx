import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material"
import { FieldValues, useForm } from "react-hook-form";
import { RiCloseLargeFill } from "react-icons/ri"
import { toast } from "react-toastify";
import apiClient from "../../apiClient/ApiClient";
import useContextPro from "../../hooks/useContextPro";

interface Props {
    passwordOpen: boolean;
    handlePasswordClose: () => void;
}

function PasswordForm({ passwordOpen, handlePasswordClose }: Props) {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const { state: { user }, dispatch } = useContextPro();

    const onSubmit = async (data: FieldValues) => {
        try {
            await apiClient.patch(`/users/${user?.id}`, {
                password: data.password
            });

            dispatch({ type: "CHANGE_PASSWORD", payload: data.password });

            toast.success("Password updated successfully!");
            handlePasswordClose();
            reset();
        } catch (error) {
            console.error("Error updating password:", error);
            toast.error("Failed to update password");
        }
    }



    const password = watch("password");

    return (
        <Dialog
            open={passwordOpen}
            onClose={handlePasswordClose}
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
                    Change Password
                </Box>
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handlePasswordClose}
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
                            type="text"
                            label="New Password"
                            variant="outlined"
                            margin="normal"
                            error={!!errors.password}
                            helperText={
                                errors.password?.type === "required" ? "Password is required" :
                                    errors.password?.type === "minLength" ? "Minimum 6 characters" :
                                        ""
                            }
                            {...register("password", {
                                required: true,
                                minLength: 6
                            })}
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
                            type="text"
                            label="Confirm Password"
                            variant="outlined"
                            margin="normal"
                            error={!!errors.confirmPassword}
                            helperText={
                                errors.confirmPassword?.type === "required"
                                    ? "Confirm your password"
                                    : errors.confirmPassword?.type === "validate"
                                        ? "Passwords do not match"
                                        : ""
                            }
                            {...register("confirmPassword", {
                                required: true,
                                validate: value => value === password || "Passwords do not match"
                            })}
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
                        onClick={() => {
                            reset();
                            handlePasswordClose();
                        }}
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

export default PasswordForm;