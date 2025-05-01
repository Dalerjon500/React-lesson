import { Navigate } from "react-router-dom";

interface Props {
    isAllowed : boolean;
    children: React.ReactNode;
}
function ProtectedRoute({ isAllowed, children }: Props) {
    if (!isAllowed) {
        return <Navigate to="/" replace />;
    }
    return (
        children
    )
}

export default ProtectedRoute