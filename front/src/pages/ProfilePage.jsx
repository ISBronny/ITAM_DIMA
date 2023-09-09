import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {TeamsTable} from "../components/TeamsTable";
import {HacksTable} from "../components/HacksTable";

export const ProfilePage = () => {
    let {id} = useParams();

    const [state, setState] = useState({
        isLoading: true,
        user: {},
    });

    useEffect(() => {
        if (state.isLoading)
            fetch(`${process.env.REACT_APP_BACKEND_URL}/participant/${id}`, {
                method: 'get',
            })
                .then(x => x.json())
                .then(json => {
                    setState({...state, isLoading: false, user: json})
                })
                .catch(x => console.log(x))

    }, [id, state]);


    return (
        <>
            {state.isLoading ? <div></div> :
                <div className="grid grid-cols-6 gap-4 w-full">
                    <div className="col-span-2 min-h-[440px]">
                        <div className="w-full h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex flex-col items-center pb-10">
                                <div className="m-3 mt-20 relative inline-flex items-center justify-center w-32 h-32 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                    <span className="font-medium text-6xl text-gray-600 dark:text-gray-300">{state.user.name.split(' ').map(x => x[0])}</span>
                                </div>
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{state.user.name}</h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">@{state.user.telegram}</span>
                                <div className="m-4 w-3/4 flex flex-wrap justify-center">
                                    {(state.user.skills ?? [".net", "Python", "c/c++", "Node.js", "JAVA"]).map(s =>
                                        <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{s.toUpperCase()}</span>
                                    )
                                    }
                                </div>
                                <h5 className="mb-1 text-xs font-medium text-gray-900 dark:text-white">{state.user.name}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 min-h-[440px]">
                        <div className="w-full h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                            <HacksTable user={id}/>
                        </div>

                    </div>
                    <div className="col-span-6 h-96">
                        <div className="w-full max-h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  overflow-auto">
                            <TeamsTable search={false} user={id}/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}