import { Box, Typography } from '@mui/material';

import { Link, useLocation } from 'react-router-dom';
import { FaEdit, FaListAlt, FaUsers } from 'react-icons/fa';
import { IoMdPhotos } from "react-icons/io";

function Header() {
    const location = useLocation();

    const navItems = [
        { path: "/Users", icon: <FaUsers className="fs-5" />, label: "Users", class: "active-user" },
        { path: "/Posts", icon: <FaEdit className="fs-5" />, label: "Posts", class: "active-post" },
        { path: "/Todos", icon: <FaListAlt className="fs-5" />, label: "Todos", class: "active-todo" },
        { path: "/Photos", icon: <IoMdPhotos className="fs-5" />, label: "Photos", class: "active-photo" },
    ];

    return (
        <header className="bg-white py-3 shadow-sm border-bottom position-sticky top-0 z-3" style={{ zIndex: 999 }}>
            <div className="container d-flex justify-content-between align-items-center">
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

                    <Typography variant="h5" fontWeight={700} sx={{ color: '#333' }}>
                        Users Management
                    </Typography>
                </Box>

                <nav className="d-flex align-items-center gap-3">
                    {navItems.map((item) => (
                        <Link key={item.path} to={item.path} className="text-decoration-none">
                            <button
                                className={`d-flex align-items-center text-dark gap-2 px-3 py-2 rounded-pill fw-semibold transition 
                                ${location.pathname === item.path
                                    ? `${item.class}  shadow-sm`
                                    : 'bg-light text-dark border'
                                }`}
                                style={{
                                    border: 'none',
                                    transition: 'all 0.3s ease',
                                    fontSize: '0.9rem'
                                }}
                            >
                                {item.icon}
                                {item.label}
                            </button>
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}

export default Header;
