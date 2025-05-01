import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { FaHome, FaServer, FaProjectDiagram, FaBlog, FaUser, FaCog, FaSignOutAlt} from 'react-icons/fa';
import useContextPro from '../../hooks/useContextPro';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SidebarItem } from '../admin/SidebarItem';
import { useState } from 'react';

function Super_Admin() {
    const {dispatch } = useContextPro();
    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
    };

    const initialMenu = [
        { id: 1, label: "Services", icon: <FaServer />, to: "services" },
        { id: 2, label: "Projects", icon: <FaProjectDiagram />, to: "project" },
        { id: 3, label: "Blog", icon: <FaBlog />, to: "blog" },
        { id: 4, label: "Profile", icon: <FaUser />, to: "profile" },
        { id: 5, label: "Settings Users", icon: <FaCog />, to: "settings-users" },
    ];

    const [menuItems, setMenuItems] = useState(initialMenu);

    const moveItem = (dragIndex: number, hoverIndex: number) => {
        const updatedMenu = [...menuItems];
        const [draggedItem] = updatedMenu.splice(dragIndex, 1);
        updatedMenu.splice(hoverIndex, 0, draggedItem);
        setMenuItems(updatedMenu);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={`super-admin-container d-flex`} style={{ minHeight: '100vh' }}>
                <div className="sidebar bg-dark text-white p-3" style={{ width: '280px', minHeight: '100vh' }}>
                    <Link to="/" className="text-decoration-none text-white">
                        <div className="d-flex align-items-center mb-4">
                            <FaHome className="fs-4 me-2" />
                            <h1 className="sidebar-title fs-5 mb-0">Super Admin Dashboard</h1>
                        </div>
                    </Link>

                    <hr className="bg-light my-4" />

                    <ul className="nav nav-pills flex-column">
                        {menuItems.map((item, index) => (
                            <SidebarItem
                                key={item.id}
                                id={item.id}
                                index={index}
                                moveItem={moveItem}
                                to={item.to}
                                icon={item.icon}
                                label={item.label}
                            />
                        ))}
                    </ul>

                    <div className="position-absolute bottom-0 start-0 p-3 w-100">
                        <div className="d-flex align-items-center text-white mb-3">
                            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                <FaUser className="fs-5" />
                            </div>
                            <div className="ms-3">
                                <div className="fw-bold">Super Admin</div>
                                <small className="text-white">Administrator</small>
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
        </DndProvider>
    )
}

export default Super_Admin;