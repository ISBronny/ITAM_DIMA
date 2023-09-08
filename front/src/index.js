import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {HackathonsPage} from "./pages/HackathonsPage";
import {CreateHackathonPage} from "./pages/CreateHackathonPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <HackathonsPage/>,
            },
            {
                path: "/hackathon/create",
                element: <CreateHackathonPage/>,
            },
            {
                path: "/teams",
                element: <div>Список команд</div>,
            },
            {
                path: "/team/:id",
                element: <div>Профиль команды</div>,
            },
            {
                path: "/participants",
                element: <div>Участники</div>,
            },
            {
                path: "/participant/:id",
                element: <div>Профиль участника</div>,
            },
        ]
    },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
