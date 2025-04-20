import { CommentType } from "../page/Comments";
import {
    FaUser,
    FaRegEnvelope,
    FaRegHeart,
    FaReply,
    FaIdCard,
    FaTrashAlt
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiVerifiedBadgeFill } from "react-icons/ri";

interface Props {
    comments: CommentType[];
    deleteComment: (id: number) => void;
}

function CommentList({ comments, deleteComment }: Props) {
    return (
        <div className="row">
            <div className="col-lg-12 col-xl-12">
                {comments.length === 0 ? (
                    <div className="text-center py-5">
                        <div
                            className="d-inline-block p-4 rounded-circle mb-3"
                            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                        >
                            <FaUser style={{ color: "#4fc3f7" }} size={32} />
                        </div>
                        <h4 className="text-white mb-2">No comments yet</h4>
                        <p className="text-muted">Be the first to share your thoughts!</p>
                    </div>
                ) : (
                    <div className="mt-3">
                        {comments.map((comment) => (
                            <div
                                key={comment.id}
                                className="card mb-4 border-0"
                                style={{
                                    borderRadius: "16px",
                                    backgroundColor: "rgba(30, 30, 30, 0.8)",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    transition: "transform 0.2s ease",
                                    backdropFilter: "blur(10px)",
                                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                                }}
                            >
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-start gap-3">
                                        <div className="position-relative">
                                            <div
                                                className="p-3 rounded-circle"
                                                style={{ backgroundColor: "rgba(79, 195, 247, 0.1)" }}
                                            >
                                                <FaUser className="text-info" size={18} />
                                            </div>
                                            <RiVerifiedBadgeFill
                                                className="text-info position-absolute"
                                                style={{
                                                    bottom: 0,
                                                    right: 0,
                                                    fontSize: "14px"
                                                }}
                                            />
                                            <small className="text-muted d-block text-center mt-1">
                                                #{comment.postId}
                                            </small>
                                        </div>

                                        <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <div>
                                                    <h3 className="h6 text-white mb-0">
                                                        {comment.name || `User ${comment.userId}`}
                                                    </h3>
                                                    <div className="d-flex align-items-center gap-2 mt-1 flex-wrap">
                                                        <span className="badge bg-secondary text-muted small d-flex align-items-center border border-secondary">
                                                            <FaRegEnvelope className="me-1" size={10} />
                                                            {comment.email}
                                                        </span>
                                                        <span className="badge bg-warning text-muted small d-flex align-items-center border border-secondary">
                                                            <FaIdCard className="me-1" size={10} />
                                                            ID: {comment.id}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button className="btn btn-link text-muted p-0">
                                                    <BsThreeDotsVertical />
                                                </button>
                                            </div>

                                            <p className="text-white mb-3" style={{ fontSize: "0.95rem", opacity: 0.9 }}>
                                                {comment.body}
                                            </p>

                                            <div className="d-flex align-items-center gap-3 flex-wrap">
                                                <button
                                                    className="btn btn-sm d-flex align-items-center gap-1"
                                                    style={{
                                                        backgroundColor: "rgba(79, 195, 247, 0.1)",
                                                        color: "#4fc3f7",
                                                        border: "1px solid rgba(79, 195, 247, 0.3)",
                                                        borderRadius: "8px"
                                                    }}
                                                >
                                                    <FaRegHeart size={14} />
                                                    <span>Like</span>
                                                </button>
                                                <button
                                                    className="btn btn-sm d-flex align-items-center gap-1"
                                                    style={{
                                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                                        color: "#ffffff",
                                                        border: "1px solid rgba(255, 255, 255, 0.2)",
                                                        borderRadius: "8px"
                                                    }}
                                                >
                                                    <FaReply size={14} />
                                                    <span>Reply</span>
                                                </button>
                                                <button
                                                    onClick={() => deleteComment(comment.id)}
                                                    className="btn btn-sm d-flex align-items-center gap-1"
                                                    style={{
                                                        backgroundColor: "rgba(244, 67, 54, 0.1)",
                                                        color: "#f44336",
                                                        border: "1px solid rgba(244, 67, 54, 0.3)",
                                                        borderRadius: "8px"
                                                    }}
                                                >
                                                    <FaTrashAlt size={14} />
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommentList;