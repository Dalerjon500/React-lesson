import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#00ff9d", // Neon green
            light: "#5affc2",
            dark: "#00c77f",
            contrastText: "#0f0f0f",
        },
        secondary: {
            main: "#00bfff", // Bright cyan
            light: "#4fdfff",
            dark: "#008ecc",
        },
        background: {
            default: "#0f0f0f",
            paper: "#1c1c1c",
        },
        text: {
            primary: "#ffffff",
            secondary: "#b0b0b0",
        },
    },
    typography: {
        fontFamily: "'Poppins', sans-serif",
        h4: {
            fontWeight: 600,
            color: "#00ff9d",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "12px",
                    textTransform: "none",
                    padding: "10px 20px",
                    boxShadow: "none",
                    color: "#0f0f0f",
                    transition: "all 0.3s ease",
                    "&:hover": {
                        boxShadow: "0 4px 20px rgba(0, 255, 157, 0.4)",
                        transform: "translateY(-2px)",
                    },
                },
                contained: {
                    background: "linear-gradient(135deg, #00ff9d 0%, #00bfff 100%)",
                    color: "#0f0f0f",
                    "&:hover": {
                        background: "linear-gradient(135deg, #00bfff 0%, #00ff9d 100%)",
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        backgroundColor: "#1c1c1c",
                        color: "#ffffff",
                        "& fieldset": {
                            borderColor: "#333333",
                        },
                        "&:hover fieldset": {
                            borderColor: "#00ff9d",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#00bfff",
                        },
                    },
                    "& .MuiInputLabel-root": {
                        color: "#888",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "#00ff9d",
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: "16px",
                    backgroundColor: "#1c1c1c",
                    boxShadow: "0 4px 24px rgba(0, 255, 157, 0.1)",
                    border: "1px solid #2c2c2c",
                },
            },
        },
        MuiPagination: {
            styleOverrides: {
                root: {
                    "& .MuiPaginationItem-root": {
                        color: "#00ff9d",
                        "&.Mui-selected": {
                            backgroundColor: "#00ff9d",
                            color: "#0f0f0f",
                            "&:hover": {
                                backgroundColor: "#00bfff",
                            },
                        },
                        "&:hover": {
                            backgroundColor: "#2a2a2a",
                        },
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#333",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#00bfff",
                    },
                    color: "#ffffff",
                },
            },
        },
    },
});
