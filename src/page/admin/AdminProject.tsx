import { useEffect, useState } from "react"
import { Category, Project } from "../home/Home"
import apiClient from "../../apiClient/ApiClient"
import AdminProjectForm from "./AdminProjectForm"

function AdminProject() {
    const [project, setProject] = useState<Project[]>([])
    const [category, setCategory] = useState<Category[]>([])
    const [open, setOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)

    useEffect(() => {
        getProject()
        getCategory()
    }, [])

    const handleClose = () => {
        setSelectedProject(null);
        setOpen(false);
    };

    const getProject = async () => {
        try {
            const res = await apiClient.get(`/projects`);
            setProject(res.data)
        } catch (err) {
            console.error(err);
        }
    }

    const getCategory = async () => {
        try {
            const res = await apiClient.get(`/category`);
            setCategory(res.data)
        } catch (err) {
            console.error(err);
        }
    }

    const deleteProject = async (id: number | undefined) => {
        try {
            await apiClient.delete(`/projects/${id}`);
            getProject();
        } catch (err) {
            console.error(err);
        }
    }

    const addProject = async (data: Omit<Project, "id">) => {
        try {
            await apiClient.post(`/projects`, data);
            getProject();
        } catch (err) {
            console.error(err);
        }
    }

    const updateProject = async (data: Project) => {
        try {
            await apiClient.put(`/projects/${data.id}`, data);
            getProject();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="adminProject" style={{ backgroundColor: '#0d1117', minHeight: '100vh', color: '#c9d1d9' }}>
            <div className="container py-5">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5">
                    <div className="mb-4 mb-md-0">
                        <h1 className="fw-bold mb-3" style={{ color: '#58a6ff' }}>
                            Project Management
                        </h1>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb" style={{ background: 'transparent' }}>
                                <li className="breadcrumb-item">
                                    <a href="#" style={{ color: '#8b949e' }}>Dashboard</a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page" style={{ color: '#58a6ff' }}>
                                    Projects
                                </li>
                            </ol>
                        </nav>
                    </div>

                    <button
                        className="btn fw-bold d-flex align-items-center"
                        onClick={() => {
                            setSelectedProject(null);
                            setOpen(true);
                        }}
                        style={{
                            background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                            border: 'none',
                            color: '#fff',
                            padding: '0.75rem 2rem',
                            borderRadius: '10px',
                            boxShadow: '0 0 20px rgba(37, 117, 252, 0.4)',
                            transition: 'transform 0.3s ease'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        + Add New Project
                    </button>
                </div>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {project.map((item) => (
                        <div className="col" key={item.id}>
                            <div
                                className="card h-100 border-0 shadow-lg"
                                style={{
                                    backgroundColor: '#161b22',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    transition: 'transform 0.3s ease',
                                }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div className="position-relative" style={{ height: '180px', overflow: 'hidden' }}>
                                    <img
                                        src={item.imgUrl}
                                        className="w-100 h-100 object-fit-cover"
                                        style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                    <span className="position-absolute top-0 end-0 m-2 badge"
                                          style={{ backgroundColor: '#238636', color: '#fff' }}>
                                        Active
                                    </span>
                                </div>

                                <div className="card-body">
                                    <span
                                        className="badge mb-3"
                                        style={{
                                            backgroundColor: '#21262d',
                                            color: '#58a6ff',
                                            padding: '5px 10px',
                                            fontSize: '0.85rem'
                                        }}
                                    >
                                        {category.find(cat => cat.id === item.categoryId)?.name || "Uncategorized"}
                                    </span>
                                </div>

                                <div className="card-footer bg-transparent border-0 d-flex justify-content-between pt-0">
                                    <button
                                        className="btn btn-sm flex-grow-1 me-2"
                                        style={{
                                            backgroundColor: '#238636',
                                            border: 'none',
                                            color: '#fff',
                                            transition: 'background 0.3s'
                                        }}
                                        onClick={() => {
                                            setSelectedProject(item);
                                            setOpen(true);
                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-sm flex-grow-1"
                                        style={{
                                            backgroundColor: '#da3633',
                                            border: 'none',
                                            color: '#fff',
                                            transition: 'background 0.3s'
                                        }}
                                        onClick={() => deleteProject(item.id)}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f85149'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#da3633'}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <AdminProjectForm
                open={open}
                onClose={handleClose}
                selectedProject={selectedProject}
                category={category}
                addProject={addProject}
                updateProject={updateProject}
            />
        </div>
    )
}

export default AdminProject
