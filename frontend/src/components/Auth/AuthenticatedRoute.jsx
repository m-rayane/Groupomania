import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";

import Auth from "../../utils/contexts/Auth";

const AuthenticatedRoute = ({ path, element }) => {
    const { isAuthenticated } = useContext(Auth);

    return isAuthenticated ? (
        <Route exact path={path} element={element} />
    ) : (
        <Navigate to="/login" />
    )
}

export default AuthenticatedRoute;