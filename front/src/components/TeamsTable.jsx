import axios from "axios";
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import React from "@types/react";


export const TeamsTable = () => {

    const [state, setState] = useState({
        isLoading: true,
        teamsRows: false,
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
    }, [state]);


    return (
        <>
            <div className="flex items-top justify-center h-screen pt-10">
                <div className="max-w-[100%] rounded overflow-hidden w-full">
                    <table className="w-full shadow">
                        <thead className="dark:bg-gray-900 bg-gray-100">
                        <tr>
                            <td className="text-xs font-semibold text-gray-800 dark:text-gray-100 uppercase sm:py-4 py-3 sm:pl-4 pl-3">
                                <div className="flex items-center">
                                    Название команды
                                </div>
                            </td>
                            <td className="text-xs font-semibold text-gray-800 dark:text-gray-100 pl-4 uppercase">
                                <div className="flex items-center">
                                    Дата создания
                                </div>
                            </td>
                            <td className="text-xs font-semibold text-gray-800 dark:text-gray-100 pl-4 uppercase">
                                <div className="flex items-center">
                                    Кол-во участий
                                </div>
                            </td>
                            <td className="text-xs font-semibold text-gray-800 dark:text-gray-100 pl-4 uppercase">
                                <div className="flex items-center">
                                    Кол-во побед
                                </div>
                            </td>
                        </tr>
                        </thead>
                        <tbody className="bg-gray-50 dark:bg-gray-800">
                            <div>
                                {state.isLoading ? "" : state.teamsRows.map(h => <TeamsTableRow
                                    name={h.name}
                                    date={h.date}
                                    entriesNumber={h.entriesNumber}
                                    winsNumber={h.winsNumber}
                                />)}
                            </div>
                        </tbody>
                    </table>
                </div>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width={22} height={19} viewBox="0 0 22 19" fill="none">
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