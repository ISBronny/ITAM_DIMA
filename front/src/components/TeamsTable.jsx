import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import "../styles/main.css"
import {ParticipantsTable} from "./ParticipantsTable";
import {ParticipantRoundLogo} from "./ParticipantRoundLogo";


export const TeamsTable = ({user= null, search= true}) => {

    const [state, setState] = useState({
        isLoading: true,
        teams: false,
        filter: '',
    });

    useEffect(() => {
        if (state.isLoading){
            let url = `${process.env.REACT_APP_BACKEND_URL}/teams/`+ (user != null ? `user/${user}` : "");
            console.log('URL:', url)
            fetch(url, {
                method: 'get',
            })
                .then(x => x.json())
                .then(json => {
                    setState({...state, isLoading: false, teams: json})
                })
                .catch(x => console.log(x))
        }


    }, [state, user]);


    return (
        <>
            <>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&family=M+PLUS+Rounded+1c:wght@700&family=Overpass:wght@500&display=swap');
                </style>
            </>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg scrollbar-thin">
                {search ?                 <div className="pb-4 bg-white dark:bg-gray-900">
                        <label htmlFor="table-search"
                               className="sr-only">Search</label>
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                     aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 20 20">
                                    <path stroke="currentColor"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="text"
                                   id="table-search"
                                   className="comforta block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Поиск команды"
                                   onChange={event => setState({...state, filter: event.currentTarget.value})}
                            />
                        </div>
                    </div>
                    : ""}
                <div className="w-full h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <table className="comforta w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col"
                            className="p-4">
                            Название команды
                        </th>
                        <th scope="col"
                            className="px-6 py-3">
                           Дата создания
                        </th>
                        <th scope="col"
                            className="px-6 py-3">
                           Лидер
                        </th>
                        <th scope="col"
                            className="px-6 py-3">
                            Участников
                        </th>
                        <th scope="col"
                            className="px-6 py-3">
                            Победы
                        </th>
                        <th scope="col"
                            className="px-6 py-3">
                            Участники
                        </th>
                        <th scope="col"
                            className="px-6 py-3">
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {state.isLoading ?

                        <div role="status" className="p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-96 mb-2.5"></div>
                                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                </div>
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                            </div>
                            <div className="flex items-center justify-between pt-4">
                                <div>
                                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                </div>
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                            </div>
                            <div className="flex items-center justify-between pt-4">
                                <div>
                                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                </div>
                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                            </div>
                            <div className="flex items-center justify-between pt-4">
                                <div>
                                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                    <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                </div>
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                            </div>
                            <div class="flex items-center justify-between pt-4">
                                <div>
                                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                    <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                </div>
                                <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                            </div>
                            <span class="sr-only">Loading...</span>
                        </div>
                        : state.teams.filter(h=>h.name.startsWith(state.filter)).map(h =>
                        <tr className="comforta bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {h.name}
                            </th>
                            <td className="px-6 py-4">
                                {new Date(Date.parse(h.createdAt)).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                                <NavLink className="font-medium text-blue-600 dark:text-blue-500 hover:underline" to={`/participant/${h.leader}`}>{h.leader}</NavLink>
                            </td>
                            <td className="px-6 py-4">
                                {h.membersCount}
                            </td>
                            <td className="px-6 py-4">
                                {0}
                            </td>
                            <div className="flex items-center">
                                <ParticipantRoundLogo members={h.members}/>
                            </div>
                            <td className="px-6 py-1">
                                <NavLink className="font-medium text-blue-600 dark:text-blue-500 hover:underline" to={`/team/${h.id}`}>Профиль</NavLink>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                </div>
            </div>
        </>
    )
}
