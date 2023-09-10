import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {NavLink} from "react-router-dom";

export const HackathonDescriptionPage = () => {

    let {id} = useParams();

    const [state, setState] = useState({
        isLoading: true,
        hackathon: {},
        filter: '',
    });

    useEffect(() => {
        if (state.isLoading)
            fetch(`${process.env.REACT_APP_BACKEND_URL}/hackathon/${id}`, {
                method: 'get',
            })
                .catch(x => console.log(x))
                .then(x => x.json())
                .then(json => {
                    setState({...state, isLoading: false, hackathon: json})
                })
                .catch(x => console.log(x))
    }, [id, state]);


    return (
        <>
            <div className="grid grid-cols-6 gap-4 w-full">
                <div className="col-span-6">
                    <div className="mx-auto min-w-full max-w-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <img className="rounded-t-lg mx-auto w-full object-cover h-96"
                             src={!!state.hackathon.imageUrl ? state.hackathon.imageUrl : "https://images.wallpaperscraft.ru/image/single/fon_temnyj_piatna_51861_1920x1080.jpg"}
                             alt=""/>
                        <div className="px-5 py-5">
                            <h5 className="text-center mb-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{state.hackathon.name}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{state.hackathon.description}</p>
                        </div>
                    </div>
                </div>
                {!!state.hackathon.hackathonResults ? <Winners results={state.hackathon.hackathonResults}/> : ""}

                <div className="col-span-3 h-96">
                    <div className="w-full max-h-full h-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                    </div>
                </div>
                <div className="col-span-3 h-96">
                    <div className="w-full max-h-full h-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                    </div>
                </div>
            </div>
        </>
    );
}



const Winners = ({results}) => {
    return (
        <>
            <div className="col-span-2 h-72 mt-20">

                <WinnerCard
                    place={2}
                    link={results.secondPlace.link}
                    teamName={results.secondPlace.team.name}
                    description={results.secondPlace.description}
                    teamId={results.secondPlace.team.id}
                />
            </div>
            <div className="col-span-2 h-72">
                <WinnerCard
                    place={1}
                    link={results.firstPlace.link}
                    teamName={results.firstPlace.team.name}
                    description={results.firstPlace.description}
                    teamId={results.firstPlace.team.id}

                />
            </div>
            <div className="col-span-2 h-72 mt-40">
                <WinnerCard
                    place={3}
                    link={results.thirdPlace.link}
                    teamName={results.thirdPlace.team.name}
                    description={results.thirdPlace.description}
                    teamId={results.thirdPlace.team.id}
                />
            </div>
        </>
    )
}

const WinnerCard = ({place, teamName, teamId, link, description}) => {

    return(
        <div className="w-full max-h-full px-6 h-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center">
            <h5 className="text-center mb-1 mt-3 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{place} место</h5>
            <NavLink className="mb-2 text-3xl font-medium text-gray-900 dark:text-white hover:underline" to={`/team/${teamId}`}>{teamName}</NavLink>
            <a href={link} className="mb-2 font-medium text-blue-600 dark:text-blue-500 hover:underline">GitHub</a>
            <p className="text-center text-sm mb-2 text-gray-500 dark:text-gray-400">{description}</p>
        </div>
    )
}