import {
    createBrowserRouter, Link, NavLink, Outlet,
    RouterProvider,
} from "react-router-dom";

export const ProfilePage = () => {

    let hacks = [
        {
            team: "Team 1",
            hack: "hack 1",
            imageUrl: "https://res.cloudinary.com/dc6deairt/image/upload/v1638284256/course-img_tf0g8c.png"
        },
        {
            team: "Team 2",
            hack: "hack 2",
            imageUrl: "https://res.cloudinary.com/dc6deairt/image/upload/v1638284256/course-img_tf0g8c.png"
        },
        {
            team: "Team 3",
            hack: "hack 3",
            imageUrl: "https://res.cloudinary.com/dc6deairt/image/upload/v1638284256/course-img_tf0g8c.png"
        },
        {
            team: "Team 4",
            hack: "hack 4",
            imageUrl: "https://res.cloudinary.com/dc6deairt/image/upload/v1638284256/course-img_tf0g8c.png"
        },
        {
            team: "Team 5",
            hack: "hack 5",
            imageUrl: "https://res.cloudinary.com/dc6deairt/image/upload/v1638284256/course-img_tf0g8c.png"
        }
    ] //Получить с бэка

    let personal_data = [
        {
            name: "Иван",
            second_name: "Иванов",
            third_name: "Иванович",
            telegram: "@ararat",
            phone: "+79999999999",
            email: "ararat@mail.ru",
            imageURL: "https://preview.cruip.com/mosaic/images/user-64-13.jpg"
        }
    ] //Получить с бэка
    return (
        <>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"></h2>
            {personal_data.map(h => <Profile_data_Card
                name={h.name}
                second_name={h.second_name}
                third_name={h.third_name}
                email={h.email}
                phone={h.phone}
                telegram={h.telegram}
                imageUrl={h.imageURL}
            />)}
            <div className="flex items-stretch">
            {hacks.map(h => <Profile_hacks_Card
                team={h.team}
                hack={h.hack}
                imageUrl={h.imageUrl}
            />)}
            </div>
        </>
    )
}

const Profile_data_Card = ({name, second_name, third_name, telegram, email, phone, imageUrl}) => {
    return(
        <>
            <section className="antialiased text-gray-600  p-4 mb-0">
                <div>
                    <div>
                        <div className="relative px-1 sm:px-1 lg:px-1 pb-1 max-w-3xl mx-auto" x-data="{ card: true }">
                            <div className="bg-white px-8 pb-6 rounded-b shadow-lg">
                                <div className="flex space-x-4">
                                    <div className="w-80">
                                        <div className="text-center mb-6">
                                            <div className="mb-2">
                                                <img className="-mt-2 rounded-full" src={imageUrl} width="150" height="150" alt="User" />
                                            </div>
                                        </div>
                                        <div className="flex justify-start mb-8 \">
                                            <div className="mb-4">
                                                <button className="font-medium text-sm inline-flex items-center justify-center px-2 py-1 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2">
                                                    edit profile
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div x-show="card flex items-center justify-center">
                                            <div className="space-y-4">
                                                <div className="flex space-x-4">
                                                    <div>
                                                        <label className="block text-sm font-medium mb-1" htmlFor="name">Имя</label>
                                                        <input id="name" className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" placeholder={name} />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium mb-1" htmlFor="second_name">Фамилия</label>
                                                        <input id="second_name" className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" placeholder={second_name} />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium mb-1" htmlFor="third_name">Отчество</label>
                                                        <input id="third_name" className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" placeholder={third_name} />
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <label className="block text-sm font-medium mb-1" htmlFor="card-expiry">telegram</label>
                                                    <input id="card-expiry" className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" placeholder={telegram} />
                                                </div>
                                                <div className="flex-1">
                                                    <label className="block text-sm font-medium mb-1" htmlFor="card-cvc">Номер телефона</label>
                                                    <input id="card-cvc" className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" placeholder={phone} />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-1" htmlFor="card-email">email</label>
                                                    <input id="card-email" class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="email" placeholder={email} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


const Profile_hacks_Card = ({team, hack, imageUrl}) => {
    return(
        <>
            <div className="w-60 m-5 max-w-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col h-full bg-white shadow-lg rounded-lg overflow-hidden">
                    <a className="block focus:outline-none focus-visible:ring-2" href="#0">
                        <figure className="relative h-0 pb-[56.25%] overflow-hidden">
                            <img className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out" src={imageUrl} width="320" height="180" alt="Course"/>
                        </figure>
                    </a>
                    <div className="flex-grow flex flex-col p-5">
                        <div className="flex-grow">
                            <div className="mb-8">
                                <p>{team}</p>
                                <p>{hack}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}