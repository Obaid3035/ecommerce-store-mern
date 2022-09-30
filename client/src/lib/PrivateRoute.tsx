import React from 'react';
import {errorNotify} from "../utils/toast";
import { useNavigate} from "react-router-dom";
import jwt from "jwt-decode"
import { getToken, removeToken } from "../utils/helper";
import axios from "axios";

interface IPrivateRouteProps {
    children: JSX.Element,
    role: string
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({children, role}) => {
    const token = getToken()
    const navigate = useNavigate()

    if (!token) {
        errorNotify("You are not authorize")
        window.location.href = '/admin/login'
        return null;
    }


    const decode: { user: any } = jwt(token);

    if (!decode.user) {
        removeToken();
        errorNotify("You are not authorize")
        window.location.href = '/admin/login'
        return null;
    }

    if (decode.user && decode.user.roleName !== role) {
        removeToken();
        errorNotify("You are not authorize")
        window.location.href = '/admin/login'
        return null;
    }


    axios.get(`/auth/authorize/${token}`)
        .catch((err) => {
            if (err) {
                removeToken();
                errorNotify("You are not authorize")
                navigate("/admin/login")
            }
        })
    return children
};

export default PrivateRoute;
