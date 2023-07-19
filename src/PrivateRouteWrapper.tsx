import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteWrapperProps {
    isAllowed: boolean;
    redirectPath: string;
}

const PrivateRouteWrapper: React.FC<PrivateRouteWrapperProps> = ({
    isAllowed,
    redirectPath,
}) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath} />;
    }

    return <Outlet />;
};

export default PrivateRouteWrapper;
