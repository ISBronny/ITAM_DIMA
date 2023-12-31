import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import "../styles/main.css"

export const HacksTable = ({user, search= false}) => {

    const [state, setState] = useState({
        isLoading: true,
        hacks: false,
        filter: '',
    });

    useEffect(() => {
        if (state.isLoading)
            fetch(`${process.env.REACT_APP_BACKEND_URL}/hackathon/user/${user}`, {
                method: 'get',
            })
                .then(x => x.json())
                .then(json => {
                    setState({...state, isLoading: false, hacks: json})
                })
                .catch(x => console.log(x))

    }, [state, user]);


    return (
        <>
            <>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&family=M+PLUS+Rounded+1c:wght@700&family=Overpass:wght@500&display=swap');
                </style>
            </>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="comforta text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col"
                            className="p-4">
                            Название хакатона
                        </th>
                        <th scope="col"
                            className="px-6 py-3">
                            Даты проведения
                        </th>
                        <th scope="col"
                            className="px-6 py-3">
                            Роль
                        </th>
                        <th scope="col"
                            className="px-6 py-3">
                            Победа
                        </th>
                        <th scope="col"
                            className="px-6 py-3">

                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {state.isLoading ? <tr></tr> : state.hacks.map(h =>
                        <tr className="comforta bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {h.name}
                            </th>
                            <td className="px-6 py-4">
                                {new Date(Date.parse(h.startDate)).toLocaleDateString()} - {new Date(Date.parse(h.endDate)).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                                {h.role === "leader" ? "Лидер" : "Учатсник"}
                            </td>
                            <td className="px-6 py-4">
                                Нет
                            </td>
                            <td className="px-6 py-4">
                                <NavLink className="font-medium text-blue-600 dark:text-blue-500 hover:underline" to={`/hackathon/${h.id}`}>Хакатон</NavLink>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    )
}