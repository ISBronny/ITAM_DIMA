import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {ParticipantsTable} from "../components/ParticipantsTable";

export const ParticipantsPage = () => {

    const [state, setState] = useState({
        isLoading: true,
        participants: [],
        filter: '',
    });

    useEffect(() => {
        if (state.isLoading)
            fetch(`${process.env.REACT_APP_BACKEND_URL}/participants/`, {
                method: 'get',
            })
                .then(x => x.json())
                .then(json => {
                    setState({...state, isLoading: false, participants: json})
                })
                .catch(x => console.log(x))

    }, [state]);


    return (
       <>
           <ParticipantsTable/>
       </>
    )
}
