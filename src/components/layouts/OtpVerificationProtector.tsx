import { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../../redux/hooks";
import { tokenVerify } from "../../redux/api/features/units/tokenVerify";

type TProtectedRoute = {
    children: ReactNode;
};

const OtpProtectedRoute = ({ children }: TProtectedRoute) => {
    const token = useAppSelector((state) => state.auth.otpToken);
    const decodedToken = token ? tokenVerify(token) : null;
    if (!decodedToken?.email) {
        return <Navigate to="/login" replace={true} />;
    }
    return <>{children}</>;
};

export default OtpProtectedRoute;