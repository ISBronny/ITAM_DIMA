import {
    createBrowserRouter, Link, NavLink, Outlet,
    RouterProvider, useNavigate,
} from "react-router-dom";
import {isAuthorized} from "./auth/RouteGuard";
import {useEffect, useState} from "react";

export const Navbar = () => {

    let [redirectState, setRedirectState] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (redirectState) {
            navigate('/');
        }
    });

    return(
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>

                            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>

                            <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img className="h-8 w-auto" src="../assets/images/itam32.jpg" alt="Your Company"/>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <NavLink to={"/"}
                                         className={({ isActive, isPending }) =>
                                             isActive
                                                 ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                                                 : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium "
                                         }>Хакатоны</NavLink>
                                <NavLink to={"/teams"}
                                         className={({ isActive, isPending }) =>
                                             isActive
                                                 ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                                                 : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium "
                                         }>Команды</NavLink>
                                <NavLink to={"/participants"}
                                         className={({ isActive, isPending }) =>
                                             isActive
                                                 ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                                                 : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium "
                                         }>Участники</NavLink>
                                <NavLink to={"/teams3"}
                                         className={({ isActive, isPending }) =>
                                             isActive
                                                 ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                                                 : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium "
                                         }>Запросы</NavLink>
                                <NavLink to={"/registration"}
                                         className={({ isActive, isPending }) =>
                                             isActive
                                                 ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                                                 : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium "
                                         }>Регистрация</NavLink>
                                <NavLink to={"/profile"}
                                         className={({ isActive, isPending }) =>
                                             isActive
                                                 ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                                                 : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium "
                                         }>Профиль</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {isAuthorized() ?
                            <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800
                             focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm my-2 px-5 py-2 text-center
                              mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    setRedirectState(true)
                                }}
                            >
                                Выйти
                            </button>
                            :
                        <NavLink to={"/login"}
                                 className={({ isActive, isPending }) =>
                                     isActive
                                         ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                                         : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium "
                                 }>Вход</NavLink>
                        }
                    </div>
                </div>
            </div>

            <div class="sm:hidden" id="mobile-menu">
                <div class="space-y-1 px-2 pb-3 pt-2">
                    <a href="#" class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</a>
                    <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</a>
                    <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</a>
                    <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</a>
                </div>
            </div>
        </nav>
    );
}