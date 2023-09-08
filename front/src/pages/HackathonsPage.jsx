import {
    createBrowserRouter, Link, NavLink, Outlet,
    RouterProvider,
} from "react-router-dom";

export const HackathonsPage = () => {

    let hacks = [
        {
            name: "ITAM 2023",
            description: "HASudihj HADSUIhai hduahuisdh usahiodjaoiHu sdhuiaohsdui. AHSDU(jd0iajioj ~!!!! jdisajkpo",
            imageUrl: "https://gsb.hse.ru/data/2021/09/01/1416777204/1Plaza_Roja,_ITAM.jpg"
        },
        {
            name: "ITAM 2023",
            description: "HASudihj HADSUIhai hduahuisdh usahiodjaoiHu sdhuiaohsdui. AHSDU(jd0iajioj ~!!!! jdisajkpo",
            imageUrl: "https://gsb.hse.ru/data/2021/09/01/1416777204/1Plaza_Roja,_ITAM.jpg"
        },
        {
            name: "ITAM 2023",
            description: "HASudihj HADSUIhai hduahuisdh usahiodjaoiHu sdhuiaohsdui. AHSDU(jd0iajioj ~!!!! jdisajkpo",
            imageUrl: "https://gsb.hse.ru/data/2021/09/01/1416777204/1Plaza_Roja,_ITAM.jpg"
        }
    ] //Получить с бэка

    return (
        <>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Хакатоны</h2>
            <div className="">
                <NavLink to={"/hackathon/create"}
                         className={({ isActive, isPending }) =>
                             isActive
                                 ? "bg-purple-700 text-white rounded-md px-3 py-2 text-sm font-medium absolute right-8"
                                 : "text-gray-300 hover:bg-purple-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                         }>Добавить Хакатон</NavLink>
                <div>
            </div>
                {hacks.map(h => <HackathonCard
                    name={h.name}
                    description={h.description}
                    imageUrl={h.imageUrl}
                />)}
            </div>
        </>
    )
}

const HackathonCard = ({name, description, imageUrl}) => {
    return(
        <>
            <div className="m-5 max-w-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img className="rounded-t-lg" src={imageUrl} alt="" />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Какая-то кнопка
                    </a>
                </div>
            </div>
        </>
    )
}