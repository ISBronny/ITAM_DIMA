import Datepicker from "tailwind-datepicker-react"
import {useState} from "react";
import {redirect} from "react-router-dom";
import axios from "axios";


export const CreateHackathonPage = () => {
    const [state, setState] = useState({
        name: '',
        description: '',
        startDate: new Date().toISOString(),
        endDate: '',
        file: {},
    });
    const [startDateShow, setStartDateShow] = useState(false);
    const [endDateShow, setEndDateShow] = useState(false);

    return (
        <>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-amber-50 sm:truncate sm:text-3xl sm:tracking-tight">Создание
                хакатона</h2>
            <form className="text-start">
                <div className="mb-6 items-start">
                    <label htmlFor="email"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Название</label>
                    <input type="text"
                           id="email"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                         block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="ITAM 2023"
                           required
                           onChange={event => setState({
                               ...state,
                               name: event.currentTarget.value
                           })}/>
                </div>
                <div className="mb-6">
                    <label htmlFor="message"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Описание</label>
                    <textarea id="message"
                              rows="4"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Это будет самый замечательный хакатон в вашей жизни..."
                              onChange={event => setState({
                                  ...state,
                                  description: event.currentTarget.value
                              })}
                    ></textarea>
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           htmlFor="user_avatar">Обложка</label>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer
                  bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                           aria-describedby="user_avatar_help"
                           id="user_avatar"
                           type="file"
                           accept=".jpg, .png, .jpeg, .bmp, .tif, .tiff|image/*"
                           onChange={(event) => {
                               setState({...state, file: event.target.files[0]})
                           }}
                    />
                </div>

                <div className="flex items-center mb-6">
                    <span className="mx-4 text-gray-500">С</span>

                    <div className="relative">

                        <Datepicker setShow={setStartDateShow}
                                    show={startDateShow}
                                    options={getOptions()}
                                    onChange={(date) => {
                                        setState({...state, startDate: date.toISOString()})
                                    }}
                        />
                    </div>
                    <span className="mx-4 text-gray-500">по</span>
                    <div className="relative">
                        <Datepicker setShow={setEndDateShow}
                                    show={endDateShow}
                                    options={getOptions()}
                                    onChange={(date) => {
                                        setState({...state, endDate: date.toISOString()})
                                    }}
                        /></div>
                </div>

                <button type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg
                      text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => {
                            const formData = new FormData();

                            // Update the formData object
                            formData.append(
                                "file",
                                state.file,
                                state.file.name
                            );


                            axios.post(`${process.env.REACT_APP_BACKEND_URL}/images`, formData)
                                .catch(function (error) {
                                    if (error.response) {
                                        console.log(error.response.data);
                                        console.log(error.response.status);
                                        console.log(error.response.headers);
                                    }
                                })
                                .then(async (responseJson) => {
                                    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/hackathon/`,  {...state, objectName: responseJson.data})
                                    await redirect('/')
                                }).catch((error) => {
                                console.log(error)
                            });
                        }}
                >
                    Создать
                </button>
            </form>
        </>
    )
}

const getOptions = () => {
    return {
        title: "Начало хакатона",
        autoHide: true,
        todayBtn: false,
        clearBtn: true,
        minDate: Date.now(),
        language: "ru",
    }
};