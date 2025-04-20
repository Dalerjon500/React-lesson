import { Box, Button, Modal, Typography } from "@mui/material";
import { Post, User } from "../page/Posts";
import {
    FaUser, FaHashtag, FaRegClock, FaRegHeart,
    FaTrash, FaEdit, FaExclamationTriangle,
    FaTimes, FaInfoCircle, FaRegCommentAlt
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from "react";

interface Props {
    posts: Post[];
    users: User[];
    deletePost: (id: number) => void;
    handleEdit: (post: Post) => void;
    selectedPost: (post: Post) => void;
}

function PostList({ posts, users, deletePost, handleEdit, selectedPost }: Props) {
    const userNameById = (userId: number) => {
        return users.find(user => user.id === userId);
    };

    const [openDel, setOpenDel] = useState(false);
    const [postToDelete, setPostToDelete] = useState<Post | null>(null);
    const handleOpen = (post: Post) => {
        setPostToDelete(post);
        setOpenDel(true);
    };

    const handleClose = () => {
        setPostToDelete(null);
        setOpenDel(false);
    };

    const handleDeletePost = () => {
        if (postToDelete) {
            deletePost(postToDelete.id);
            handleClose();
        }
    };

    return (
        <div className="container-fluid p-4" style={{
            backgroundColor: '#121212',
            borderRadius: '12px',
            minHeight: '100vh'
        }}>
            <div className="row g-4 justify-content-center">
                {posts.map((post) => {
                    const user = userNameById(post.userId);
                    const userName = user ? user.name : `User ${post.userId}`;

                    return (
                        <div key={post.id} className="col-12 col-sm-6 col-md-4 col-lg-3" style={{
                            minWidth: '360px',
                            maxWidth: '380px',
                            transition: 'transform 0.3s ease'
                        }}>
                            <div className="card h-100 overflow-hidden" style={{
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                                backgroundColor: '#1e1e1e',
                                borderRadius: '12px',
                                border: '1px solid #333',
                                transform: 'translateY(0)',
                            }}
                                 onMouseEnter={(e) => {
                                     e.currentTarget.style.transform = 'translateY(-10px)';
                                     e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.7)';
                                     e.currentTarget.style.borderColor = '#555';
                                 }}
                                 onMouseLeave={(e) => {
                                     e.currentTarget.style.transform = 'translateY(0)';
                                     e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
                                     e.currentTarget.style.borderColor = '#333';
                                 }}
                            >
                                <div className="card-body d-flex flex-column" style={{ padding: '1.5rem' }}>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-2 rounded-full me-3" style={{
                                            background: 'linear-gradient(135deg, #6e45e2 0%, #88d3ce 100%)',
                                            width: '36px',
                                            height: '36px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <FaUser className="text-white" size={14} />
                                        </div>
                                        <span className="small" style={{ color: '#b3b3b3' }}>{userName}</span>
                                    </div>

                                    <h5 className="card-title mb-3" style={{
                                        color: '#ffffff',
                                        minHeight: '64px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontWeight: 600,
                                        fontSize: '1.1rem'
                                    }}>
                                        {post.title}
                                    </h5>

                                    <p className="card-text flex-grow-1" style={{
                                        lineHeight: '1.6',
                                        fontSize: '0.9rem',
                                        color: '#a0a0a0',
                                        marginBottom: '1.5rem'
                                    }}>
                                        {post.body.length > 100 ? `${post.body.substring(0, 100)}...` : post.body}
                                    </p>

                                    <div className="d-flex justify-content-between align-items-center mt-auto">
                                        <span className="badge d-flex align-items-center py-2" style={{
                                            backgroundColor: '#2a2a2a',
                                            color: '#88d3ce',
                                            border: '1px solid #3a3a3a',
                                            borderRadius: '8px',
                                            fontWeight: 500
                                        }}>
                                            <FaHashtag className="me-1" size={12} />
                                            {post.id}
                                        </span>
                                        <span className="small d-flex align-items-center" style={{ color: '#7a7a7a' }}>
                                            <FaRegClock className="me-1" size={12} />
                                            {Math.floor(Math.random() * 10) + 1}m ago
                                        </span>
                                    </div>
                                </div>

                                <div className="card-footer" style={{
                                    padding: '1rem 1.5rem',
                                    backgroundColor: '#252525',
                                    borderTop: '1px solid #333'
                                }}>
                                    <div className="d-flex justify-content-between align-items-center flex-column gap-3">
                                        <div className="d-flex w-100">
                                            <button className="btn btn-sm d-flex align-items-center gap-2 px-3" style={{
                                                borderRadius: '8px',
                                                transition: 'all 0.2s ease',
                                                height: '36px',
                                                backgroundColor: 'rgba(110, 69, 226, 0.1)',
                                                color: '#b399ff',
                                                border: '1px solid rgba(110, 69, 226, 0.3)',
                                                flex: 1
                                            }}>
                                                <FaRegHeart style={{ fontSize: '0.85rem' }} />
                                                <span style={{ fontSize: '0.8rem' }}>Like</span>
                                            </button>

                                            <Link to={`/Posts/${post.id}/Comments`} className="btn btn-sm d-flex align-items-center gap-2 px-3 ms-2" style={{
                                                borderRadius: '8px',
                                                transition: 'all 0.2s ease',
                                                height: '36px',
                                                textDecoration: 'none',
                                                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                                color: '#7ab4ff',
                                                border: '1px solid rgba(59, 130, 246, 0.3)',
                                                flex: 1
                                            }}>
                                                <FaRegCommentAlt style={{ fontSize: '0.85rem' }} />
                                                <span style={{ fontSize: '0.8rem' }}>Comments</span>
                                            </Link>
                                        </div>

                                        <div className="d-flex w-100">
                                            <button onClick={() => { selectedPost(post); handleEdit(post); }}
                                                    className="btn btn-sm d-flex align-items-center gap-2 px-3" style={{
                                                borderRadius: '8px',
                                                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                                color: '#7ab4ff',
                                                border: '1px solid rgba(59, 130, 246, 0.4)',
                                                transition: 'all 0.2s ease',
                                                height: '36px',
                                                flex: 1
                                            }}>
                                                <FaEdit style={{ fontSize: '0.85rem' }} />
                                                <span style={{ fontSize: '0.8rem' }}>Edit</span>
                                            </button>

                                            <button onClick={() => handleOpen(post)}
                                                    className="btn btn-sm d-flex align-items-center gap-2 px-3 ms-2" style={{
                                                borderRadius: '8px',
                                                backgroundColor: 'rgba(220, 38, 38, 0.2)',
                                                color: '#ff7a7a',
                                                border: '1px solid rgba(220, 38, 38, 0.4)',
                                                transition: 'all 0.2s ease',
                                                height: '36px',
                                                flex: 1
                                            }}>
                                                <FaTrash style={{ fontSize: '0.85rem' }} />
                                                <span style={{ fontSize: '0.8rem' }}>Delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Modal open={openDel} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: '#1e1e1e',
                    boxShadow: 24,
                    p: 0,
                    borderRadius: '12px',
                    border: '1px solid #333',
                    textAlign: 'center',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        backgroundColor: '#252525',
                        padding: '20px',
                        marginBottom: '24px',
                        borderBottom: '1px solid #333'
                    }}>
                        <Typography variant="h6" sx={{
                            color: '#ff7a7a',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}>
                            <FaExclamationTriangle style={{ fontSize: '1.2rem' }} />
                            Delete Post
                        </Typography>
                    </div>

                    <Typography sx={{
                        mt: 2,
                        px: 3,
                        color: '#b3b3b3',
                        fontSize: '1rem',
                        lineHeight: '1.6'
                    }}>
                        Are you sure you want to delete this post? This action cannot be undone.
                    </Typography>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '16px',
                        marginTop: '32px',
                        padding: '0 24px'
                    }}>
                        <Button variant="contained" onClick={handleDeletePost} startIcon={<FaTrash />} sx={{
                            bgcolor: '#dc2626',
                            color: 'white',
                            borderRadius: '8px',
                            px: 3,
                            py: 1,
                            fontWeight: 500,
                            textTransform: 'none',
                            flex: 1,
                            '&:hover': {
                                bgcolor: '#b91c1c',
                                boxShadow: '0 2px 8px rgba(220, 38, 38, 0.3)'
                            }
                        }}>
                            Delete Post
                        </Button>

                        <Button variant="outlined" onClick={handleClose} startIcon={<FaTimes />} sx={{
                            color: '#7ab4ff',
                            borderColor: '#3b82f6',
                            borderRadius: '8px',
                            px: 3,
                            py: 1,
                            fontWeight: 500,
                            textTransform: 'none',
                            flex: 1,
                            '&:hover': {
                                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                borderColor: '#7ab4ff',
                                color: '#7ab4ff'
                            }
                        }}>
                            Cancel
                        </Button>
                    </div>

                    <div style={{
                        marginTop: '24px',
                        padding: '16px 24px',
                        borderTop: '1px solid #333',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        backgroundColor: '#252525'
                    }}>
                        <FaInfoCircle style={{ color: '#7ab4ff' }} />
                        <Typography variant="caption" sx={{ color: '#7a7a7a', fontSize: '0.8rem' }}>
                            This will permanently remove the post and all its comments
                        </Typography>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default PostList;
