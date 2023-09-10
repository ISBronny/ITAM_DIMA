import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import "../styles/main.css"

export const ParticipantRoundLogo = ({members}) => {
    const [state, setState] = useState({
        isLoading: true,
        participants: [],
        filter: '',
    });

    return (
        <>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&family=M+PLUS+Rounded+1c:wght@700&family=Overpass:wght@500&display=swap');
            </style>
            <td className="px-2 py-1">
                <div className="flex items-center">
                    {members.map(h =>
                        <div className="m-3 relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <NavLink className="font-medium text-xl text-gray-600 dark:text-gray-300" to={`/participant/${h.telegram}`}>{h.fullName.split(' ').slice(0, 2).map(x => x[0])}</NavLink>
                        </div>
                    )}
                </div>
            </td>
        </>
    );
}