import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {isAdmin} from "../components/auth/RouteGuard";
import {RequestsTable} from "../components/RequestsTable";


export const RequestsPage = () => {

    const [state, setState] = useState({
        isLoading: true,
        reqs: false,
    });

    return (
        <>
            <h1 className="font-bold mb-4 leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight ">Запросы участников</h1>
            <RequestsTable user={undefined} forAdmin={true} search={true}/>
        </>
    )
}