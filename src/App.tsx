import { Route, Routes } from "react-router-dom";
import Home from "./page/home/Home";
import Login from "./page/login/Login";
import Admin from "./page/admin/Admin";
import AdminServices from "./page/admin/AdminServices";
import SingUp from "./page/login/SingUp";
import AdminBlog from "./page/admin/AdminBlog";
import AdminProject from "./page/admin/AdminProject";
import ProtectedRoute from "./component/ProtectedRoute";
import Super_Admin from "./page/super_admin/Super_Admin";
import useContextPro from "./hooks/useContextPro";
import Profile from "./page/admin/Profile";
import Settings from "./page/super_admin/Settings";

export interface User {
    id: string;
    name: string;
    email: string;
    roles: ("ADMIN" | "USER" | "SUPER_ADMIN")[];
    password: string;
}

function App() {
    const {
        state: { user, isLoading },
    } = useContextPro();

    return (
        <div>
            {!isLoading && (
                <Routes>
                    <Route index element={<Home />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/sign-up" element={<SingUp />} />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute
                                isAllowed={!!user && user.roles.includes("ADMIN")}
                            >
                                <Admin />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="services" element={<AdminServices />} />
                        <Route path="project" element={<AdminProject />} />
                        <Route path="blog" element={<AdminBlog />} />
                        <Route path="profile" element={<Profile />} />
                    </Route>
                    <Route
                        path="super-admin"
                        element={
                            <ProtectedRoute
                                isAllowed={!!user && user.roles.includes("SUPER_ADMIN")}
                            >
                                <Super_Admin />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="services" element={<AdminServices />} />
                        <Route path="project" element={<AdminProject />} />
                        <Route path="blog" element={<AdminBlog />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="settings-users" element={<Settings />} />
                    </Route>
                    <Route path="*" element={<h1>Page not found</h1>} />
                </Routes>
            )}
        </div>
    );
}

export default App;