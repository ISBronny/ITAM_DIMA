import {useEffect, useState} from "react";
import axios from "axios";
import {setAuthToken} from "./RouteGuard";
import {useNavigate} from "react-router-dom";

export const LoginForm = () => {
    let [state, setState] = useState({
        telegram: '',
        password: '',
    })

    let [redirectState, setRedirectState] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (redirectState) {
            navigate('/');
        }
    }, [redirectState]);

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="items-center justify-center px-6 py-8 lg:py-0">
                    <div className="mx-auto w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Вход
                            </h1>
                            <form className="space-y-4 md:space-y-6"
                                  action="#">
                                <div>
                                    <label htmlFor="tg"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telegram</label>
                                    <input type="tg"
                                           name="tg"
                                           id="tg"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="@Hacker1337"
                                           required=""
                                           onChange={(event) => setState({...state, telegram: event.currentTarget.value})}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пароль</label>
                                    <input type="password"
                                           name="password"
                                           id="password"
                                           placeholder="••••••••"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           required=""
                                           onChange={(event) => setState({...state, password: event.currentTarget.value})}
                                    />
                                </div>


                                <div className="mx-auto w-full">
                                    <button
                                        className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium
                                         rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"

                                        onClick={event => {
                                            event.preventDefault()
                                        axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, state)
                                            .catch(function (error) {
                                                if (error.response) {
                                                    console.log(error.response.data);
                                                    console.log(error.response.status);
                                                    console.log(error.response.headers);
                                                }
                                            })
                                            .then(async (response) => {
                                                //get token from response
                                                const token = response.data;
                                                console.log('token', token)

                                                //set JWT token to local
                                                localStorage.setItem("token", token);

                                                //set token to axios common header
                                                setAuthToken(token);

                                                setRedirectState(true)
                                            }).catch((error) => {
                                            console.log(error)
                                        });
                                    }}
                                    >
                                        Войти
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}