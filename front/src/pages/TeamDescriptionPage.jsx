import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {NavLink} from "react-router-dom";
import {TeamsTable} from "../components/TeamsTable";
import {ParticipantsTable} from "../components/ParticipantsTable";


export const TeamDescriptionPage =()=> {
    let {id} = useParams();

    const [state, setState] = useState({
        isLoading: true,
        user: {},
    });

    useEffect(() => {
        if (state.isLoading)
            fetch(`${process.env.REACT_APP_BACKEND_URL}/teams/${id}`, {
                method: 'get',
            })
                .then(x => x.json())
                .then(json => {
                    setState({...state, isLoading: false, group: json})
                })
                .catch(x => console.log(x))

    }, [id, state]);


    return (
        <>
            {state.isLoading ? <div></div> :
                <div className="grid grid-cols-6 gap-4 w-full">
                    <div className="col-span-6 lg:col-span-2">
                        <div className="px-4 shadow rounded-lg sm:px-6 md:px-8 pt-5 pb-11 w-full sm:border-r border-gray-800 bg-gray-800">
                            <div>
                                <p className="text-xl font-bold leading-none text-white">{state.group.name}</p>
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-base font-bold leading-none text-white py-2 pr-3">Кол-во участий: 9</p>
                                    </div>
                                    <div>
                                        <p className="text-base font-bold leading-none text-white py-2">Кол-во побед: 3</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="text-lg font-bold leading-none text-white">{state.group.description}</p>
                                <p className="text-lg font-bold leading-none text-white">Да</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-6 lg:col-span-4">
                        <div className="w-full h-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  overflow-auto">
                            <ParticipantsTable search={false} teamId={id}/>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}