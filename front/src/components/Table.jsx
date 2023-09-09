import axios from "axios";
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";


export const Table = () => {

    const [state, setState] = useState({
        isLoading: true,
        hacks: false,
    });

    useEffect(() => {
        if (state.isLoading)
            fetch(`${process.env.REACT_APP_BACKEND_URL}/hackathon/`, {
                method: 'get',
            })
                .then(x => x.json())
                .then(json => {
                    setState({...state, isLoading: false, hacks: json})
                })
    }, [state]);


    return (
        <>
            <div>
                {state.isLoading ? "" : state.hacks.map(h => <TableRow
                    name={h.name}
                    description={h.description}
                    imageUrl={`${process.env.REACT_APP_BACKEND_URL}/images/${h.imageObjectName}`}
                />)}
            </div>
        </>
    )
}

const TableRow = ({name, description, imageUrl}) => {
    return (
        <>
            <div className="mx-auto min-w-full m-5 max-w-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img className="rounded-t-lg mx-auto w-full object-cover h-96"
                     src={imageUrl}
                     alt=""/>
                <div className="px-5 pt-5">
                    <a href="#">
                        <h5 className="text-center mb-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
                </div>
                <div className="flex justify-center mb-5">
                    <a href="#"
                       className=" items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Зарегистрироваться
                    </a>
                </div>

            </div>
        </>
    )
}