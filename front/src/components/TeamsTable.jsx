import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";


export const TeamsTable = () => {

    const [state, setState] = useState({
        isLoading: true,
        teamsRows: false,
        filter: '',
    });

    useEffect(() => {
        if (state.isLoading)
            fetch(`${process.env.REACT_APP_BACKEND_URL}/teams/`, {
                method: 'get',
            })
                .then(x => x.json())
                .then(json => {
                    setState({...state, isLoading: false, teamsRows: json})
                })
                .catch(x => console.log(x))

    }, [state]);


    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div class="pb-4 bg-white dark:bg-gray-900">
                    <label for="table-search"
                           class="sr-only">Search</label>
                    <div class="relative mt-1">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                               class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Поиск команды"
                               onChange={event => setState({...state, filter: event.currentTarget.value})}
                        />
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                            Количество участий
                        </th>
                        <th scope="col"
                            className="px-6 py-3">
                            Победы
                        </th>
                        <th scope="col"
                            className="px-6 py-3">

                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {state.isLoading ? <tr></tr> : state.teamsRows.filter(h=>h.name.startsWith(state.filter)).map(h =>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {h.name}
                            </th>
                            <td className="px-6 py-4">
                                {new Date(Date.parse(h.createdAt)).toLocaleDateString()}

                            </td>
                            <td className="px-6 py-4">
                                Laptop
                            </td>
                            <td className="px-6 py-4">
                                0
                            </td>
                            <td className="px-6 py-4">
                                <NavLink className="font-medium text-blue-600 dark:text-blue-500 hover:underline" to={`/team/${h.id}`}>Профиль</NavLink>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

const TeamsTableRow = ({name, date, entriesNumber, winsNumber}) => {
    return (
        <tr className="border-b border-gray-200 dark:border-gray-900">
            <td className="py-4 sm:pl-6 pl-4">
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
                            <g opacity="0.2">
                                <path d="M22 16.8462C22 18.0356 21.0149 19 19.8 19H2.2C0.98505 19 0 18.0356 0 16.8462V7.15385C0 5.96438 0.98505 5 2.2 5H19.8C21.0149 5 22 5.96438 22 7.15385V16.8462Z" fill="#231F20" />
                            </g>
                            <path fillRule="evenodd" clipRule="evenodd" d="M13.8 2.14286V12.8571H7.2V2.14286H13.8ZM13.8 0H7.2C5.98505 0 5 0.959464 5 2.14286V12.8571C5 14.0405 5.98505 15 7.2 15H13.8C15.0149 15 16 14.0405 16 12.8571V2.14286C16 0.959464 15.0149 0 13.8 0Z" fill="#4B4B4B" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 8V15.6471C0 16.9465 0.98505 18 2.2 18H19.8C21.0149 18 22 16.9465 22 15.6471V8H0Z" fill="#F96E6F" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M13.5 8.54545V10.4545H8.5V8.54545H13.5ZM13.5 6H8.5C7.11937 6 6 7.13973 6 8.54545V10.4545C6 11.8603 7.11937 13 8.5 13H13.5C14.8806 13 16 11.8603 16 10.4545V8.54545C16 7.13973 14.8806 6 13.5 6Z" fill="white" />
                            <g opacity="0.2">
                                <path d="M22 8.22222C22 6.995 21.0149 6 19.8 6H2.2C0.98505 6 0 6.995 0 8.22222V11H22V8.22222Z" fill="#231F20" />
                            </g>
                            <path fillRule="evenodd" clipRule="evenodd" d="M22 6.22222C22 4.995 21.0149 4 19.8 4H2.2C0.98505 4 0 4.995 0 6.22222V9H22V6.22222Z" fill="#F96E6F" />
                        </svg>
                    </div>
                    <div className="pl-5">
                        <p className="text-sm font-semibold leading-none text-gray-800 dark:text-gray-100 pb-2">{name}</p>
                    </div>
                </div>
            </td>
            <td className="py-4 sm:pl-6 pl-4">
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18" fill="none">
                            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x={0} y={1} width={18} height={16}>
                                <path fillRule="evenodd" clipRule="evenodd" d="M3 1.5H15C16.275 1.5 17.25 2.475 17.25 3.75V11.25C17.25 12.525 16.275 13.5 15 13.5H9.75V15H12C12.45 15 12.75 15.3 12.75 15.75C12.75 16.2 12.45 16.5 12 16.5H6C5.55 16.5 5.25 16.2 5.25 15.75C5.25 15.3 5.55 15 6 15H8.25V13.5H3C1.725 13.5 0.75 12.525 0.75 11.25V3.75C0.75 2.475 1.725 1.5 3 1.5ZM15 12C15.45 12 15.75 11.7 15.75 11.25V3.75C15.75 3.3 15.45 3 15 3H3C2.55 3 2.25 3.3 2.25 3.75V11.25C2.25 11.7 2.55 12 3 12H15Z" fill="white" />
                            </mask>
                            <g mask="url(#mask0)">
                                <rect width={18} height={18} fill="#1D4ED8" />
                            </g>
                        </svg>
                    </div>
                    <p className="text-sm leading-tight text-gray-500 dark:text-gray-400 pl-3">{date}</p>
                </div>
            </td>
            <td className="py-4 sm:pl-6 pl-4">
                <p className="text-sm font-semibold leading-none text-gray-800 dark:text-gray-100">{entriesNumber}</p>
            </td>
            <td className="py-4 sm:pl-6 pl-4">
                <p className="text-sm leading-none text-gray-800 dark:text-gray-100">{winsNumber}</p>
            </td>
        </tr>
    )
}
