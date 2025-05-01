import { Box, Divider, IconButton, Modal, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";

interface Service {
    id: number;
    name: string;
    description: string;
    imgUrl: string;
}

interface Props {
    open: boolean;
    onClose: () => void;
    addService: (data: Omit<Service, "id">) => void;
    updateService: (data: Service) => void;
    selectedService: Service | null;
}

function AdminServicesForm({
                               open,
                               onClose,
                               addService,
                               updateService,
                               selectedService,
                           }: Props) {
    const { register, handleSubmit, reset } = useForm<Service>({
        defaultValues: selectedService || { name: "", description: "", imgUrl: "" },
    });

    useEffect(() => {
        reset(selectedService || { name: "", description: "", imgUrl: "" });
    }, [selectedService, reset]);

    const onSubmit = (data: Service) => {
        if (selectedService) {
            updateService(data);
        } else {
            addService(data);
        }
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="service-modal-title"
            aria-describedby="service-modal-description"
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(4px)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    width: { xs: "90%", sm: "80%", md: "600px" },
                    bgcolor: "#1a1a1a",
                    borderRadius: "20px",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
                    p: 4,
                    outline: "none",
                    transform: open ? "scale(1)" : "scale(0.95)",
                    transition: "all 0.3s ease-in-out",
                    border: "1px solid #333",
                }}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography
                        id="service-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{
                            color: "#fff",
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            pl: 1,
                        }}
                    >
                        {selectedService ? "Edit Service" : "Add New Service"}
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        aria-label="close"
                        sx={{
                            color: "#ccc",
                            "&:hover": {
                                backgroundColor: "#333",
                                transform: "rotate(90deg)",
                            },
                            transition: "all 0.3s ease",
                        }}
                    >
                        <FaTimes style={{ fontSize: "1.2rem" }} />
                    </IconButton>
                </Box>

                <Divider
                    sx={{
                        my: 3,
                        borderColor: "#444",
                        borderWidth: "1px",
                    }}
                />

                <Box
                    sx={{
                        display: "grid",
                        gap: 2,
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                        "& .MuiTextField-root": {
                            mb: 0,
                            input: {
                                color: "#fff",
                            },
                            label: {
                                color: "#888",
                            },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "#555",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#777",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#1e88e5",
                                },
                            },
                        },
                    }}
                >
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Name"
                        variant="outlined"
                        {...register("name")}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Description"
                        variant="outlined"
                        {...register("description")}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Image URL"
                        variant="outlined"
                        {...register("imgUrl")}
                    />
                </Box>

                <Divider
                    sx={{
                        my: 3,
                        borderColor: "#444",
                        borderWidth: "1px",
                    }}
                />

                <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        startIcon={<FaTimes />}
                        sx={{
                            color: "#90caf9",
                            borderColor: "#90caf9",
                            borderRadius: "12px",
                            px: 3,
                            "&:hover": {
                                backgroundColor: "#0d47a1",
                                borderColor: "#42a5f5",
                            },
                            transition: "all 0.2s ease",
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            background: `linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)`,
                            borderRadius: "12px",
                            px: 3,
                            color: "#fff",
                            boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
                            "&:hover": {
                                transform: "translateY(-1px)",
                                boxShadow: "0 6px 16px rgba(33, 150, 243, 0.4)",
                            },
                            transition: "all 0.2s ease",
                            "&:disabled": {
                                background: "#444",
                                color: "#aaa",
                            },
                        }}
                    >
                        {selectedService ? "Update Service" : "Add Service"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default AdminServicesForm;
