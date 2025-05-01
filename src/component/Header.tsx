import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "../assets/Agency.svg";
import { FaChevronDown, FaShieldAlt, FaSignOutAlt, FaUserAlt, FaUserShield } from "react-icons/fa";
import useContextPro from "../hooks/useContextPro";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, Typography } from "@mui/material";

interface HeaderProps {
    translations: {
        [key: string]: {
            [key: string]: string;
        };
    };
}

function Header({ translations }: HeaderProps) {
    const { state: { user }, dispatch } = useContextPro();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const open = Boolean(anchorEl);

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            setCurrentLanguage(savedLanguage);
        }
    }, []);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
        handleMenuClose();
    };

    const changeLanguage = (language: string) => {
        setCurrentLanguage(language);
        localStorage.setItem('language', language);
    };

    const t = (key: string) => {
        return translations[currentLanguage]?.[key] || key;
    };

    return (
        <header id="header">
            <img src={Logo} alt="Agency Logo" />
            <ul>
                <li><a href="#home">{t('home')}</a></li>
                <li><a href="#about">{t('about')}</a></li>
                <li><a href="#services">{t('services')}</a></li>
                <li><a href="#projects">{t('projects')}</a></li>
                <li><a href="#feedback">{t('feedback')}</a></li>
                <li><a href="#blog">{t('blog')}</a></li>
                <li><a href="#contact">{t('contact')}</a></li>
                <li>
                    <select
                        className="language-select"
                        value={currentLanguage}
                        onChange={(e) => changeLanguage(e.target.value)}
                    >
                        <option value="en">EN</option>
                        <option value="uz">UZ</option>
                    </select>
                </li>
                {!user ? (
                    <li>
                        <NavLink
                            to="/login"
                            className="login text-decoration-none"
                            style={{ color: '#BDC2FF' }}
                        >
                            {t('login')}
                        </NavLink>
                    </li>
                ) : (
                    <li className="profile" style={{ listStyle: 'none' }}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                cursor: 'pointer',
                                padding: '8px 12px',
                                borderRadius: '20px',
                                transition: 'all 0.3s ease'
                            }}
                            onClick={handleMenuOpen}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: user.name ? '#4a69bd' : '#6c757d',
                                    width: 36,
                                    height: 36,
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    color: '#fff'
                                }}
                            >
                                {user.name ? user.name[0].toUpperCase() : <FaUserAlt size={14} />}
                            </Avatar>
                            <FaChevronDown
                                size={12}
                                style={{
                                    color: '#6c757d',
                                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s ease'
                                }}
                            />
                        </div>

                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleMenuClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            PaperProps={{
                                elevation: 4,
                                sx: {
                                    width: 240,
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    mt: 1.5,
                                    border: '1px solid rgba(0, 0, 0, 0.1)',
                                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.12)'
                                }
                            }}
                        >
                            <Box sx={{ px: 1.5, py: 1.5, borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                    {user.name || 'Guest'}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    {user.email}
                                </Typography>
                            </Box>

                            {user?.roles?.includes("SUPER_ADMIN") && (
                                <MenuItem
                                    onClick={handleMenuClose}
                                    sx={{
                                        py: 1.5,
                                        '&:hover': {
                                            backgroundColor: 'rgba(25, 118, 210, 0.08)'
                                        }
                                    }}
                                >
                                    <Link
                                        to="/super-admin"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            width: '100%'
                                        }}
                                    >
                                        <FaShieldAlt style={{ color: '#1976d2', fontSize: '16px' }} />
                                        <span>{t('superAdmin')}</span>
                                    </Link>
                                </MenuItem>
                            )}

                            {user?.roles?.includes("ADMIN") && (
                                <MenuItem
                                    onClick={handleMenuClose}
                                    sx={{
                                        py: 1.5,
                                        '&:hover': {
                                            backgroundColor: 'rgba(2, 136, 209, 0.08)'
                                        }
                                    }}
                                >
                                    <Link
                                        to="/admin"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            width: '100%'
                                        }}
                                    >
                                        <FaUserShield style={{ color: '#0288d1', fontSize: '16px' }} />
                                        <span>{t('admin')}</span>
                                    </Link>
                                </MenuItem>
                            )}

                            <MenuItem
                                onClick={handleLogout}
                                sx={{
                                    py: 1.5,
                                    '&:hover': {
                                        backgroundColor: 'rgba(211, 47, 47, 0.08)'
                                    }
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <FaSignOutAlt style={{ color: '#d32f2f', fontSize: '16px' }} />
                                    <span>{t('logout')}</span>
                                </div>
                            </MenuItem>
                        </Menu>
                    </li>
                )}
            </ul>
        </header>
    );
}

export default Header;
