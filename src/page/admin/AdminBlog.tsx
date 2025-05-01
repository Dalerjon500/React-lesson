
import { useState, useEffect } from "react";
import apiClient from "../../apiClient/ApiClient";
import { Blog } from "../home/Home";
import { FiFileText, FiPlusCircle, FiEdit2, FiTrash2} from "react-icons/fi";
import AdminBlogForm from "./AdminBlogForm";

function AdminBlog() {
    const [open, setOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
    const [blog, setBlog] = useState<Blog[]>([]);

    useEffect(() => {
        getBlog();
    }, []);


    const handleClose = () => {
        setSelectedBlog(null);
        setOpen(false);
    };

    const getBlog = async () => {
        try {
            const res = await apiClient.get(`/blog`);
            setBlog(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteBlog = async (id: number | undefined) => {
        try {
            await apiClient.delete(`/blog/${id}`);
            getBlog();
        } catch (err) {
            console.log(err);
        }
    };

    const addBlog = async (data: Omit<Blog, "id">) => {
        try {
            await apiClient.post(`/blog`, data);
            getBlog();
        } catch (err) {
            console.log(err);
        }
    };

    const updateBlog = async (data: Blog) => {
        try {
            await apiClient.put(`/blog/${data.id}`, data);
            getBlog();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="h2 fw-bold text-primary mb-2">
                        <FiFileText className="me-2" size={28} />
                        Blog Management
                    </h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Blog</li>
                        </ol>
                    </nav>
                </div>
                <button
                    onClick={() => {
                        setOpen(true);
                        setSelectedBlog(null);
                    }}
                    className="btn btn-primary d-flex align-items-center shadow-sm"
                >
                    <FiPlusCircle className="me-2" size={18} />
                    Add New Blog
                </button>
            </div>

            <AdminBlogForm
                open={open}
                onClose={handleClose}
                selectedBlog={selectedBlog}
                addBlog={addBlog}
                updateBlog={updateBlog}
            />

            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                            <tr>
                                <th className="ps-4" style={{width: '80px'}}>ID</th>
                                <th>Title</th>
                                <th style={{width: '150px'}}>Status</th>
                                <th className="pe-4 text-end" style={{width: '180px'}}>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {blog.map((item) => (
                                <tr key={item.id}>
                                    <td className="ps-4 fw-semibold align-middle">#{item.id}</td>
                                    <td className="align-middle">
                                        <div className="d-flex align-items-center">
                                            {item.imgUrl && (
                                                <img
                                                    src={item.imgUrl}
                                                    alt={item.title}
                                                    className="rounded me-3 shadow-sm"
                                                    style={{
                                                        width: '60px',
                                                        height: '40px',
                                                        objectFit: 'cover',
                                                        border: '1px solid #eee'
                                                    }}
                                                />
                                            )}
                                            <div className="d-flex flex-column">
                                                <h6 className="mb-0">{item.title}</h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="align-middle">
                      <span className="badge bg-success bg-opacity-10 text-success">
                        Published
                      </span>
                                    </td>
                                    <td className="pe-4 align-middle text-end">
                                        <div className="d-flex justify-content-end">
                                            <button
                                                className="btn btn-sm btn-outline-primary me-2 d-flex align-items-center"
                                                onClick={() => {
                                                    setSelectedBlog(item);
                                                    setOpen(true);
                                                }}
                                            >
                                                <FiEdit2 className="me-1" size={14} />
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-danger d-flex align-items-center"
                                                onClick={() => deleteBlog(item.id)}
                                            >
                                                <FiTrash2 className="me-1" size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminBlog;
