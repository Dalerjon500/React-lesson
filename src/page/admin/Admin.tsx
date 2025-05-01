
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { FaHome, FaServer, FaProjectDiagram, FaBlog, FaUser, FaSignOutAlt} from 'react-icons/fa';
import useContextPro from '../../hooks/useContextPro';

function Admin() {

    const {dispatch } = useContextPro();
    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
    };

    return (
        <div className="super-admin-container d-flex" style={{ minHeight: '100vh' }}>
            <div className="sidebar bg-dark text-white p-3" style={{ width: '280px', minHeight: '100vh' }}>
                <Link to="/" className="text-decoration-none text-white">
                    <div className="d-flex align-items-center mb-4">
                        <FaHome className="fs-4 me-2" />
                        <h1 className="sidebar-title fs-5 mb-0">Admin Dashboard</h1>
                    </div>
                </Link>

                <hr className="bg-light my-4" />

                <ul className="nav nav-pills flex-column">
                    <li className="nav-item mb-2">
                        <NavLink
                            className={({isActive}) => isActive ? "active nav-link d-flex align-items-center" : "nav-link text-white d-flex align-items-center"}
                            to="services"
                        >
                            <FaServer className="me-3" />
                            <span>Services</span>
                        </NavLink>
                    </li>
                    <li className="nav-item mb-2">
                        <NavLink
                            className={({isActive}) => isActive ? "active nav-link d-flex align-items-center" : "nav-link text-white d-flex align-items-center"}
                            to="project"
                        >
                            <FaProjectDiagram className="me-3" />
                            <span>Projects</span>
                        </NavLink>
                    </li>
                    <li className="nav-item mb-2">
                        <NavLink
                            className={({isActive}) => isActive ? "active nav-link d-flex align-items-center" : "nav-link text-white d-flex align-items-center"}
                            to="blog"
                        >
                            <FaBlog className="me-3" />
                            <span>Blog</span>
                        </NavLink>
                    </li>
                    <li className="nav-item mb-2">
                        <NavLink
                            className={({isActive}) => isActive ? "active nav-link d-flex align-items-center" : "nav-link text-white d-flex align-items-center"}
                            to="profile"
                        >
                            <FaUser className="me-3" />
                            <span>Profile</span>
                        </NavLink>
                    </li>
                </ul>

                <div className="position-absolute bottom-0 start-0 p-3 w-100">
                    <div className="d-flex align-items-center text-white mb-3">
                        <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                            <FaUser className="fs-5" />
                        </div>
                        <div className="ms-3">
                            <div className="fw-bold">Admin</div>
                            <small className="text-muted">Administrator</small>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center">
                        <FaSignOutAlt className="me-2" />
                        Logout
                    </button>
                </div>
            </div>
            <div className="content flex-grow-1 p-4" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="bg-white rounded-3 p-4 shadow-sm" style={{ minHeight: 'calc(100vh - 2rem)' }}>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Admin;
