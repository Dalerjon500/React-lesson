import { FormControl, InputLabel, MenuItem, Pagination, Select } from "@mui/material";
import Stack from "@mui/material/Stack";
// import { ChangeEvent } from "react";

interface Props {
    limit: number;
    pageSize: number;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

function PageAndLimitPhoto({ limit, setLimit, setPage, pageSize }: Props) {
    const changePage = (_: unknown, value: number): void => {
        setPage(value);
    };

    return (
        <div
            className="pageAndLimit d-flex align-items-center justify-content-between mb-4"
            style={{
                padding: "16px",
                borderRadius: "16px",
                background: "linear-gradient(145deg, #1a1a1a, #2a2a2a)",
                border: "1px solid #444",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                flexWrap: "wrap",
                gap: "16px",
                color: "#e0e0e0"
            }}
        >
            <FormControl sx={{ minWidth: 150 }} size="small">
                <InputLabel
                    id="rows-per-page-label"
                    sx={{
                        color: "#9e9e9e",
                        "&.Mui-focused": {
                            color: "#aaa"
                        }
                    }}
                >
                    Items per page
                </InputLabel>
                <Select
                    value={limit}
                    onChange={(e) => {
                        setLimit(Number(e.target.value));
                        setPage(1);
                    }}
                    labelId="rows-per-page-label"
                    label="Items per page"
                    sx={{
                        backgroundColor: "#2d2d2d",
                        borderRadius: "8px",
                        "& .MuiSelect-select": {
                            color: "#ffffff",
                            fontWeight: 500
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#555"
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#777"
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#aaa",
                            borderWidth: "2px"
                        },
                        "& .MuiSvgIcon-root": {
                            color: "#9e9e9e"
                        }
                    }}
                >
                    {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((num) => (
                        <MenuItem
                            key={num}
                            value={num}
                            sx={{
                                color: "#e0e0e0",
                                fontWeight: 500,
                                backgroundColor: "#2d2d2d",
                                "&:hover": {
                                    backgroundColor: "#3d3d3d"
                                },
                                "&.Mui-selected": {
                                    backgroundColor: "#4d4d4d"
                                }
                            }}
                        >
                            Show {num}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Stack spacing={2}>
                <Pagination
                    count={pageSize}
                    onChange={changePage}
                    color="standard"
                    shape="rounded"
                    sx={{
                        "& .MuiPaginationItem-root": {
                            borderRadius: "6px",
                            color: "#e0e0e0",
                            backgroundColor: "#3d3d3d",
                            border: "1px solid #444",
                            "&.Mui-selected": {
                                backgroundColor: "#555",
                                color: "#ffffff",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "#666"
                                }
                            },
                            "&:hover": {
                                backgroundColor: "#4d4d4d"
                            },
                            "&.MuiPaginationItem-ellipsis": {
                                backgroundColor: "transparent"
                            }
                        },
                        "& .MuiSvgIcon-root": {
                            color: "#9e9e9e"
                        }
                    }}
                />
            </Stack>
        </div>
    );
}

export default PageAndLimitPhoto;
