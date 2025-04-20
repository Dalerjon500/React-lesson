import { ChangeEvent, useEffect, useRef, useState } from "react";
import PostList from "../component/PostList";
import UserSelect from "../component/UserSelect";
import apiClient from "../apiClient/ApiClient";
import { FaArrowDown, FaInfoCircle, FaNewspaper, FaPlus, FaSearch } from "react-icons/fa";
import PageAndLimit from "../component/PageAndLimit";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import axios from "axios";
import AddPostForm from "../component/AddPostForm";
import { toast } from "react-toastify";
import Loading from "../component/LoadingForUsers";

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface User {
    id: number;
    name: string;
}

function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState<number | "">("");
    const [openAdd, setOpenAdd] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const searchTimeout = useRef<number | null>(null);

    useEffect(() => {
        fetchPosts();
        fetchUsers();
    }, [page, limit, search, selectedUser]);

    const fetchPosts = () => {
        setIsLoading(true);
        let url = `/posts?_page=${page}&_limit=${limit}`;

        if (search) url += `&title_like=${search}`;
        if (selectedUser !== "") url += `&userId=${selectedUser}`;

        axios
            .get(apiClient.defaults.baseURL + url)
            .then((res) => {
                setPageSize(Math.floor(res.headers["x-total-count"] / limit));
                setPosts(res.data);
            })
            .catch(console.error)
            .finally(() => setIsLoading(false));
    };

    const fetchUsers = () => {
        axios.get(apiClient.defaults.baseURL + `/users`)
            .then((res) => setUsers(res.data));
    };

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        setIsLoading(true);
        searchTimeout.current = setTimeout(() => setSearch(value), 700);
    };

    const handleOpen = () => setOpenAdd(true);
    const handleClose = () => {
        setOpenAdd(false);
        setSelectedPost(null);
    };

    const addPosts = (data: Omit<Post, "id">) => {
        const tempPosts = [...posts];
        const newPost = { ...data, id: posts.length + 1 };
        setPosts([...tempPosts, newPost]);

        axios.post(apiClient.defaults.baseURL + `/posts`, newPost)
            .then(res => {
                setPosts([...tempPosts, res.data]);
                toast.success("Post added successfully");
            })
            .catch(err => {
                setPosts(tempPosts);
                toast.error("Failed to add post: " + err.message);
            });
    };

    const deletePost = (id: number) => {
        const tempPosts = [...posts];
        setPosts(tempPosts.filter(post => post.id !== id));
        axios.delete(apiClient.defaults.baseURL + `/posts/${id}`)
            .then(() => toast.success("Post deleted"))
            .catch(err => {
                setPosts(tempPosts);
                toast.error("Delete failed: " + err.message);
            });
    };

    const updatePost = (updatedPost: Post) => {
        const tempPosts = [...posts];
        setPosts(tempPosts.map(post => post.id === updatedPost.id ? updatedPost : post));
        axios.patch(apiClient.defaults.baseURL + `/posts/${updatedPost.id}`, updatedPost)
            .then((res) => {
                setPosts(posts.map(post => post.id === updatedPost.id ? res.data : post));
                toast.success("Post updated");
            })
            .catch(err => {
                setPosts(tempPosts);
                toast.error("Update failed: " + err.message);
            });
    };

    const handleEdit = (post: Post) => {
        setSelectedPost(post);
        setOpenAdd(true);
    };

    return (
        <div style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "20px",
            background: "linear-gradient(to bottom right, #f0fff4, #e8f5e9)",
            borderRadius: "24px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.1)"
        }}>
            {isLoading && <Loading />}

            <div className="posts-header" style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "20px",
                borderBottom: "2px solid #d0f0c0"
            }}>
                <Typography variant="h4" sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'linear-gradient(90deg, #43a047, #66bb6a)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 'bold'
                }}>
                    <FaNewspaper style={{ fontSize: '2.5rem' }} />
                    All Posts
                </Typography>

                <Button
                    onClick={handleOpen}
                    variant="contained"
                    startIcon={<FaPlus />}
                    sx={{
                        backgroundColor: "#43a047",
                        '&:hover': {
                            backgroundColor: "#388e3c"
                        },
                        borderRadius: '12px',
                        padding: '10px 20px',
                        fontWeight: 'bold'
                    }}
                >
                    Add New
                </Button>
            </div>

            <AddPostForm
                addPosts={addPosts}
                updatePost={updatePost}
                selectedPost={selectedPost}
                openAdd={openAdd}
                onClose={handleClose}
                users={users}
            />

            <div style={{ marginTop: "24px", marginBottom: "16px" }}>
                <TextField
                    onChange={handleSearch}
                    fullWidth
                    label="Search by title..."
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FaSearch style={{ color: '#66bb6a' }} />
                            </InputAdornment>
                        )
                    }}
                />
            </div>

            <div className="filters" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '16px'
            }}>
                <UserSelect
                    users={users}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                />
                <PageAndLimit
                    pageSize={pageSize}
                    limit={limit}
                    setLimit={setLimit}
                    setPage={setPage}
                />
            </div>

            {!isLoading && <PostList
                handleEdit={handleEdit}
                selectedPost={(post: Post) => setSelectedPost(post)}
                deletePost={deletePost}
                users={users}
                posts={posts}
            />}

            <div className="text-center mt-4 mb-5">
                <Button
                    onClick={() => setLimit(limit + 10)}
                    variant="outlined"
                    endIcon={<FaArrowDown />}
                    sx={{
                        borderRadius: '12px',
                        padding: '10px 24px',
                        borderWidth: '2px',
                        fontWeight: 600,
                        backgroundColor: '#ffffff',
                        '&:hover': {
                            backgroundColor: '#e8f5e9',
                            borderColor: '#66bb6a'
                        }
                    }}
                >
                    Load More
                </Button>
                <Typography
                    variant="body2"
                    sx={{
                        color: '#757575',
                        marginTop: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                    }}
                >
                    <FaInfoCircle />
                    Showing {Math.min(limit, posts.length)} of {posts.length} posts
                </Typography>
            </div>
        </div>
    );
}

export default Posts;
