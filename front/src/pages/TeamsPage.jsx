import {
    createBrowserRouter, Link, NavLink, Outlet,
    RouterProvider,
} from "react-router-dom";
import {TeamsTable} from "../components/TeamsTable";

export const TeamsPage = () => {
    return(
        <TeamsTable />
    );
}