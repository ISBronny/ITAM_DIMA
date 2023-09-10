import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {NavLink} from "react-router-dom";
import {TeamsTable} from "../components/TeamsTable";
import {ParticipantsTable} from "../components/ParticipantsTable";



export const TeamDescriptionPage =()=> {
    let {id} = useParams();

    const [state, setState] = useState({
        isLoading: true,
        group: {},
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
                        <Statistics group={state.group}/>
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

const Statistics = ({group}) =>{
    return(
        <>
            <div className="px-4 shadow rounded-lg sm:px-6 md:px-8 pt-5 pb-11 w-full h-96 sm:border-r border-gray-800 bg-gray-800">
                <div>
                    <p className="text-center text-3xl font-bold leading-none text-white">{group.name}</p>
                    <div className="flex w-full justify-center mt-20 gap-4">
                        <div className="flex flex-col">
                            <h6 className="text-2xl font-bold text-gray-100 text-center">1</h6>
                            <p className="text-sm font-medium tracking-widest text-gray-400 uppercase lg:text-base">
                                Победы
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <h6 className="text-2xl font-bold text-gray-100 text-center">3</h6>
                            <p className="text-sm font-medium tracking-widest text-gray-400 uppercase lg:text-base">
                                Призёрства
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <h6 className="text-2xl font-bold text-gray-100 text-center">10</h6>
                            <p className="text-sm font-medium tracking-widest text-gray-400 uppercase lg:text-base">
                                Участия
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}