import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Blog } from "../home/Home";

interface Props {
    open: boolean;
    onClose: () => void;
    selectedBlog: Blog | null;
    addBlog: (data: Omit<Blog, "id">) => void;
    updateBlog: (data: Blog) => void;
}

const AdminBlogForm: React.FC<Props> = ({ open, onClose, selectedBlog, addBlog, updateBlog }) => {
    const [title, setTitle] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (selectedBlog) {
            setTitle(selectedBlog.title);
            setImgUrl(selectedBlog.imgUrl || "");
        } else {
            setTitle("");
            setImgUrl("");
            setDescription("");
        }
    }, [selectedBlog]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newData = { title, imgUrl, description };
        if (selectedBlog) {
            updateBlog({ ...selectedBlog, ...newData });
        } else {
            addBlog(newData);
        }
        onClose();
    };

    return (
        <Modal show={open} onHide={onClose} centered size="lg">
            <div
                style={{
                    background: "#0d1117",
                    color: "#c9d1d9",
                    padding: "2rem",
                    borderRadius: "12px",
                    border: "1px solid #30363d",
                }}
            >
                <h4 className="mb-4 fw-bold text-info">
                    {selectedBlog ? "Edit Blog" : "Add New Blog"}
                </h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label text-white">Title</label>
                        <input
                            type="text"
                            className="form-control bg-dark text-white border-info"
                            placeholder="Enter blog title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-white">Image URL</label>
                        <input
                            type="text"
                            className="form-control bg-dark text-white border-info"
                            placeholder="Enter image URL"
                            value={imgUrl}
                            onChange={(e) => setImgUrl(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-white">Description</label>
                        <textarea
                            className="form-control bg-dark text-white border-info"
                            placeholder="Enter blog description"
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn"
                            style={{
                                background: "linear-gradient(135deg, #238636, #2ea043)",
                                color: "#fff",
                                borderRadius: "10px",
                                padding: "8px 20px",
                                fontWeight: 500
                            }}
                        >
                            {selectedBlog ? "Update" : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AdminBlogForm;
