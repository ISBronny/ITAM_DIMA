import React from 'react';
import jwt_decode from "jwt-decode";
import {Navigate, Route} from "react-router";
import axios from "axios";

export const user_type_participant = "Participant";
export const user_type_admin = "Admin";


const RouteGuard = ({ forAdmin, component: Component, ...rest }) => {


    const token = localStorage.getItem("token");
    const decoded = !!token  ? jwt_decode(token) : "";

    return (
        <>
            {!!token ?
            (forAdmin ? (decoded['type'] === user_type_admin  ? <Component {...rest} /> : <h1 className="dark:text-white font-bold text">Нет доступа</h1> ) : <component {...rest} />  )
            : <Navigate to={'/login'} />}
        </>
    );
};

export default RouteGuard;

export const isAdmin = () => {
    const token = localStorage.getItem("token");
    if(!token)
        return false;
    const decoded = jwt_decode(token);
    if(!decoded)
        return false;
    return decoded['type'] === user_type_admin;
}

export const isAuthorized = () => {
    const token = localStorage.getItem("token");
    if(!token)
        return false;
    const decoded = jwt_decode(token);
    return !!decoded
}

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else
        delete axios.defaults.headers.common["Authorization"];
}