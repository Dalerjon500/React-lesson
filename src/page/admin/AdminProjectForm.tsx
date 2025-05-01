import {
    Box,
    Button,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
} from '@mui/material'
import { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { Category, Project } from '../home/Home'
import { useForm } from 'react-hook-form'

interface Props {
    open: boolean
    onClose: () => void
    selectedProject: Project | null
    category: Category[]
    addProject: (data: Omit<Project, "id">) => void
    updateProject: (data: Project) => void
}

function AdminProjectForm({
                              open,
                              onClose,
                              selectedProject,
                              category,
                              updateProject,
                              addProject
                          }: Props) {

    const { register, handleSubmit, reset } = useForm<Project>({
        defaultValues: selectedProject || { imgUrl: '', categoryId: undefined },
    });

    useEffect(() => {
        reset(selectedProject || { imgUrl: '', categoryId: undefined });
    }, [selectedProject, reset]);

    const onSubmit = (data: Project) => {
        if (selectedProject) {
            updateProject(data);
        } else {
            addProject(data);
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(6px)',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: { xs: '90%', sm: '80%', md: '600px' },
                    bgcolor: '#121212',
                    borderRadius: '20px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.9)',
                    p: 4,
                    outline: 'none',
                    transform: open ? 'scale(1)' : 'scale(0.95)',
                    transition: 'all 0.3s ease-in-out',
                    color: '#fff',
                    border: '1px solid #333',
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
                            color: '#ffffff',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            pl: 1,
                        }}
                    >
                        {selectedProject ? 'Edit Project' : 'Add New Project'}
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        aria-label="close"
                        sx={{
                            color: '#bbb',
                            '&:hover': {
                                backgroundColor: '#333',
                                transform: 'rotate(90deg)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <FaTimes style={{ fontSize: '1.2rem' }} />
                    </IconButton>
                </Box>

                <Divider sx={{ my: 3, borderColor: '#333' }} />

                <Box
                    sx={{
                        display: 'grid',
                        gap: 2,
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                        '& .MuiTextField-root': {
                            mb: 0,
                        },
                    }}
                >
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Image URL"
                        variant="outlined"
                        placeholder="Enter image URL"
                        {...register('imgUrl', { required: true })}
                        defaultValue={selectedProject ? selectedProject.imgUrl : ''}
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="category-select-label" sx={{ color: '#aaa' }}>Category</InputLabel>
                        <Select
                            labelId="category-select-label"
                            defaultValue={selectedProject ? selectedProject.categoryId : ''}
                            {...register('categoryId', { required: true })}
                            sx={{
                                color: '#fff',
                                backgroundColor: '#1e1e1e',
                                '.MuiSvgIcon-root': { color: '#fff' },
                            }}
                        >
                            {category.map((cat) => (
                                <MenuItem key={cat.id} value={cat.id}>
                                    {cat.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Divider sx={{ my: 3, borderColor: '#333' }} />

                <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        startIcon={<FaTimes />}
                        sx={{
                            color: '#fff',
                            borderColor: '#555',
                            borderRadius: '12px',
                            px: 3,
                            '&:hover': {
                                backgroundColor: '#333',
                                borderColor: '#777',
                            },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            background: `linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)`,
                            borderRadius: '12px',
                            px: 3,
                            color: '#fff',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                            '&:hover': {
                                transform: 'translateY(-1px)',
                                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.6)',
                            },
                        }}
                    >
                        {selectedProject ? 'Update' : 'Add'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default AdminProjectForm
