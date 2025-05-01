import { FaCrown, FaQuestion, FaUser, FaUserShield } from "react-icons/fa";

export const getRoleBadge = (roles: ("ADMIN" | "USER" | "SUPER_ADMIN")[]) => {
    return roles.map((role, index) => {
        switch (role) {
            case 'ADMIN':
                return (
                    <span key={index} className="badge bg-purple bg-opacity-10 text-purple p-2 me-2">
              <FaUserShield className="me-1" /> Admin
            </span>
                );
            case 'SUPER_ADMIN':
                return (
                    <span key={index} className="badge bg-danger bg-opacity-10 text-danger p-2 me-2">
              <FaCrown className="me-1" /> Super Admin
            </span>
                );
            case 'USER':
                return (
                    <span key={index} className="badge bg-primary bg-opacity-10 text-primary p-2 me-2">
              <FaUser className="me-1" /> User
            </span>
                );
            default:
                return (
                    <span key={index} className="badge bg-secondary bg-opacity-10 text-secondary p-2 me-2">
              <FaQuestion className="me-1" /> Unknown
            </span>
                );
        }
    });
};