import { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../../redux/hooks";
import { tokenVerify } from "../../redux/api/features/units/tokenVerify";

type TProtectedRoute = {
    children: ReactNode;
    designation?: string;
};

const ProtectedRoute = ({ children, designation }: TProtectedRoute) => {
    const token = useAppSelector((state) => state.auth.token || state.auth.otpToken);
    const user = token ? tokenVerify(token) : null;
    if (!token || (designation && user?.designation !== designation)) {
        if (token && designation && user?.designation !== designation) {
            return <Navigate to="/access-denied" replace={true} />;
        }
        return <Navigate to="/login" replace={true} />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;