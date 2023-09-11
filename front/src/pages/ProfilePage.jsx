import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {TeamsTable} from "../components/TeamsTable";
import {HacksTable} from "../components/HacksTable";
import {getCurrentUseLogin, isAdmin} from "../components/auth/RouteGuard";
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
            {state.isLoading ?
                <div role="status"
                     className="max-w p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                    <div
                        className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                            <path
                                d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                        </svg>
                    </div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <div className="flex items-center mt-4 space-x-3">
                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-700" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                        </svg>
                        <div>
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                            <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                    </div>
                    <span className="sr-only">Loading...</span>
                </div>:
                <div className="grid grid-cols-6 gap-4 w-full">
                    <div className="col-span-6 lg:col-span-2 h-96">
                        <div className="w-full h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex flex-col items-center pb-10">
                                <div className="m-3 mt-8 relative inline-flex items-center justify-center w-32 h-32 overflow-hidden rounded-full dark:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
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
                        <div className="w-full h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  overflow-x-scroll overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-900">
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
                    {id === undefined || id === getCurrentUseLogin() || isAdmin() ?
                    <div className="col-span-6 h-96">
                        <div className="w-full max-h-full h-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-900">
                            <RequestsTable user={id} search={false} forAdmin={false}/>
                        </div>
                    </div>
                        : ""}
                </div>
            }
        </>
    )
}