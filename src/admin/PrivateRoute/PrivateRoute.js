import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../firebaseInit";

const PrivateRoute = ({ children }) => {
    const [user] = useAuthState(auth);
    const location = useLocation();


    if (!user?.email) {
        return <Navigate to={"/login"} state={{ from: location }}></Navigate>
    }

    return children

}

export default PrivateRoute;