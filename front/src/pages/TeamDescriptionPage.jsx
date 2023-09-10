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
                                <p className="text-center text-3xl font-bold leading-none text-white">{state.group.name}</p>
                                <div className="flex justify-between">
                                    <div
                                        className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                                        <div className="grid grid-cols-2 row-gap-8 md:grid-cols-3">
                                            <div className="text-center md:border-r">
                                                <h6 className="text-2xl font-bold text-gray-100">144K</h6>
                                                <p className="text-sm font-medium tracking-widest text-gray-400 uppercase lg:text-base">
                                                    Победы
                                                </p>
                                            </div>
                                            <div className="text-center md:border-r">
                                                <h6 className="text-2xl font-bold text-gray-100">12.9K</h6>
                                                <p className="text-sm font-medium tracking-widest text-gray-400 uppercase lg:text-base">
                                                    Призёрства
                                                </p>
                                            </div>
                                            <div className="text-center">
                                                <h6 className="text-2xl font-bold text-gray-100">48.3K</h6>
                                                <p className="text-sm font-medium tracking-widest text-gray-400 uppercase lg:text-base">
                                                    Участия
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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