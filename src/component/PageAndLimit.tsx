import { Box, FormControl, InputLabel, MenuItem, Pagination, Select } from "@mui/material";
// import { ChangeEvent } from "react";

interface Props {
    limit: number,
    pageSize: number,
    setLimit: React.Dispatch<React.SetStateAction<number>>,
    setPage: React.Dispatch<React.SetStateAction<number>>
}

function PageAndLimit({ limit, setLimit, setPage, pageSize }: Props) {

    const changePage = (_: unknown, value: number): void => {
        setPage(value);
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            mb: 3,
            padding: 2,
            borderRadius: "16px",
            backgroundColor: 'rgba(30, 30, 30, 0.8)',
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            flexWrap: 'wrap',
            gap: 2,
            backdropFilter: 'blur(10px)'
        }}>
            <FormControl sx={{ minWidth: 140 }} size="small">
                <InputLabel id="rows-per-page-label" sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    '&.Mui-focused': {
                        color: '#4fc3f7'
                    }
                }}>
                    Page Limit
                </InputLabel>
                <Select
                    value={limit}
                    onChange={(e) => { setLimit(Number(e.target.value)); setPage(1) }}
                    labelId="rows-per-page-label"
                    label="limit"
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                        '& .MuiSelect-select': {
                            color: '#ffffff',
                            fontWeight: 500
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.1)'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.2)'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#4fc3f7',
                        },
                        '& .MuiSvgIcon-root': {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }}
                >
                    <MenuItem
                        value={5}
                        sx={{
                            backgroundColor: '#121212',
                            '&:hover': {
                                backgroundColor: 'rgba(79, 195, 247, 0.1)'
                            }
                        }}
                    >5</MenuItem>
                    <MenuItem
                        value={10}
                        sx={{
                            backgroundColor: '#121212',
                            '&:hover': {
                                backgroundColor: 'rgba(79, 195, 247, 0.1)'
                            }
                        }}
                    >10</MenuItem>
                    <MenuItem
                        value={20}
                        sx={{
                            backgroundColor: '#121212',
                            '&:hover': {
                                backgroundColor: 'rgba(79, 195, 247, 0.1)'
                            }
                        }}
                    >20</MenuItem>
                    <MenuItem
                        value={50}
                        sx={{
                            backgroundColor: '#121212',
                            '&:hover': {
                                backgroundColor: 'rgba(79, 195, 247, 0.1)'
                            }
                        }}
                    >50</MenuItem>
                </Select>
            </FormControl>

            <Pagination
                count={pageSize}
                onChange={changePage}
                color="primary"
                shape="rounded"
                sx={{
                    '& .MuiPaginationItem-root': {
                        borderRadius: '10px',
                        color: 'rgba(255, 255, 255, 0.7)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        '&.Mui-selected': {
                            backgroundColor: 'rgba(79, 195, 247, 0.2)',
                            color: '#4fc3f7',
                            fontWeight: 'bold',
                            borderColor: 'rgba(79, 195, 247, 0.3)'
                        },
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    '& .MuiSvgIcon-root': {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }}
            />
        </Box>
    )
}

export default PageAndLimit;
