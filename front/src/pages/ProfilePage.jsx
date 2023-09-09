import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {TeamsTable} from "../components/TeamsTable";
import {HacksTable} from "../components/HacksTable";
import {getCurrentUseLogin} from "../components/auth/RouteGuard";
import {RequestsTable} from "../components/RequestsTable";

export const ProfilePage = () => {
    let {id} = useParams();


    const [state, setState] = useState({
        isLoading: true,
        user: {},
    });

    useEffect(() => {
        if (state.isLoading)
            fetch(`${process.env.REACT_APP_BACKEND_URL}/participant/` + (id !== undefined ? `${id}` : getCurrentUseLogin()), {
                method: 'get',
            })
                .catch(x => console.log(x))
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
                    <div className="col-span-6 lg:col-span-2 h-96">
                        <div className="w-full h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex flex-col items-center pb-10">
                                <div className="m-3 mt-8 relative inline-flex items-center justify-center w-32 h-32 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                    <span className="font-medium text-6xl text-gray-600 dark:text-gray-300">{state.user.name.split(' ').slice(0, 2).map(x => x[0])}</span>
                                </div>
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{state.user.name}</h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">@{state.user.telegram}</span>
                                <div className="m-4 mb-0 w-3/4 flex flex-wrap justify-center">
                                    {(state.user.skills ?? [".net", "Python", "c/c++", "Node.js", "JAVA"]).map(s =>
                                        <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{s.toUpperCase()}</span>
                                    )
                                    }
                                </div>
                                <span className="text-sm mb-2 text-gray-500 dark:text-gray-400">m213542@edu.misis.ru</span>
                                <a href="https://github.com/ISBronny" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">GitHub</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 lg:col-span-4 h-96 ">
                        <div className="w-full h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-900">
                            <HacksTable user={id !== undefined ? id : getCurrentUseLogin()}/>
                        </div>

                    </div>
                    <div className="col-span-6 lg:col-span-4 h-96">
                        <div className="w-full max-h-full h-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-900">
                            <TeamsTable search={false} user={id !== undefined ? id : getCurrentUseLogin()}/>
                        </div>
                    </div>
                    <div className="col-span-6 lg:col-span-2 h-96">
                        <div className="w-full h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex flex-col items-center pb-10">
                                <h5 className="m-2 mt-4 text-2xl font-medium text-gray-900 dark:text-white">Статистика</h5>

                            </div>
                        </div>
                    </div>
                    {id === undefined || id === getCurrentUseLogin() ?
                    <div className="col-span-6 h-96">
                        <div className="w-full max-h-full h-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-900">
                            <RequestsTable/>
                        </div>
                    </div>
                        : ""}
                </div>
            }
        </>
    )
}