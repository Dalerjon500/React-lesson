import CommentList from './../component/CommentList';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../apiClient/ApiClient";
import { FaPlus, FaRegComment } from 'react-icons/fa';
import { Button, CircularProgress } from '@mui/material';
import AddCommentForm from '../component/AddCommentForm';
import { toast } from 'react-toastify';

export interface CommentType {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string,
    userId: number
}

function Comments() {
    const { id } = useParams();
    const [comments, setComments] = useState<CommentType[]>([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getComments();
    }, [id]);

    function getComments() {
        setLoading(true);
        apiClient.get<CommentType[]>(`/posts/${id}/comments`)
            .then(res => {
                setComments(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }

    const addComments = (data: Omit<CommentType, "id" | "postId" | "userId">) => {
        const copyComment = [...comments];
        const newComment: CommentType = {
            ...data,
            id: comments.length + 1,
            postId: Number(id),
            userId: 1
        };
        setComments([...copyComment, newComment]);

        apiClient.post(`/posts/${id}/comments`, newComment)
            .then(res => {
                setComments([...copyComment, res.data]);
                toast.success("Comment added successfully");
            })
            .catch(err => {
                setComments(copyComment);
                toast.error("Failed to add comment: " + err.message);
            });
    };

    const deleteComment = async (commentId: number) => {
        const originalComments = [...comments];
        try {
            setComments(comments.filter(comment => comment.id !== commentId));
            await apiClient.delete(`/comments/${commentId}`);
            toast.success("Comment deleted successfully");
        } catch (err) {
            setComments(originalComments);
            toast.error("Failed to delete comment: " + (err as Error).message);
        }
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded shadow-sm border">
                <div className="d-flex align-items-center">
                    <FaRegComment size={24} className="me-2 text-primary" />
                    <h3 className="mb-0 fw-bold text-primary">
                        Comments
                        <span className="badge bg-primary bg-opacity-25 text-primary ms-2" style={{
                            fontSize: '0.75rem',
                            padding: '0.35rem 0.6rem',
                            borderRadius: '50px'
                        }}>
                            {comments.length}
                        </span>
                    </h3>
                </div>

                <Button
                    sx={{
                        background: 'linear-gradient(to right, #42a5f5, #1e88e5)',
                        color: '#fff',
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 4px 10px rgba(33, 150, 243, 0.3)',
                        px: 3,
                        py: 1.2,
                        '&:hover': {
                            background: 'linear-gradient(to right, #1e88e5, #1565c0)',
                        }
                    }}
                    onClick={handleOpen}
                    variant="contained"
                    startIcon={<FaPlus />}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Add Comment'}
                </Button>
            </div>

            <AddCommentForm
                addComments={addComments}
                open={open}
                onClose={handleClose}
            />

            <div className="bg-white p-3 rounded shadow-sm border">
                <CommentList
                    deleteComment={deleteComment}
                    comments={comments}
                />
            </div>
        </div>
    );
}

export default Comments;
