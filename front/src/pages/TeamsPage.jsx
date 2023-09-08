import {
    createBrowserRouter, Link, NavLink, Outlet,
    RouterProvider,
} from "react-router-dom";

export const TeamsPage = () => {

    let teams = [
        {
            name: "Team 1",
            description: "Good boy",
            imageUrl: "https://c4.wallpaperflare.com/wallpaper/223/988/977/minimalism-dog-black-background-picture-dog-hd-wallpaper-preview.jpg"
        },
        {
            name: "Team 2",
            description: "God boy",
            imageUrl: "https://img.freepik.com/free-photo/portrait-lovely-dog-looking-away_23-2148366865.jpg?w=1380&t=st=1694209503~exp=1694210103~hmac=3e58002b614c17c5e9ef1e1d9e8e6018f179f4a8d100b484287a24b8db5b0a2e"
        },
        {
            name: "Team 3",
            description: "Model boy",
            imageUrl: "https://c4.wallpaperflare.com/wallpaper/484/836/988/labrador-retriever-yellow-labrador-retriever-wallpaper-preview.jpg"
        }
    ] //Получить с бэка

    return (
        <>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Команды</h2>
            <NavLink to={"/hackathon/create"}
                     className={({ isActive, isPending }) =>
                         isActive
                             ? "bg-purple-700 text-white rounded-md px-3 py-2 text-sm font-medium absolute right-8"
                             : "text-gray-300 hover:bg-purple-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                     }>Создать команду</NavLink>
            {teams.map(h => <TeamCard
                name={h.name}
                description={h.description}
                imageUrl={h.imageUrl}
            />)}
        </>
    )
}

const TeamCard = ({name, description, imageUrl}) => {
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
                        Beep
                    </a>
                </div>
            </div>
        </>
    )
}