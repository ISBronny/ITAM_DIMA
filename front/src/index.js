import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {HackathonsPage} from "./pages/HackathonsPage";
import {ProfilePage} from "./pages/ProfilePage";
import {TeamsPage} from "./pages/TeamsPage"
import {ParticipantsPage} from "./pages/ParticipantsPage";
import {RegistrationPage} from "./pages/RegistrationPage";
import RouteGuard from "./components/auth/RouteGuard";
import {CreateHackathonPage} from "./pages/CreateHackathonPage";
import {TeamDescriptionPage} from "./pages/TeamDescriptionPage"

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
                element:
                    <RouteGuard forAdmin={true} component={CreateHackathonPage}/>,
            },
            {
                path: "/teams",
                element: <TeamsPage/>,
            },
            {
                path: "/team/:id",
                element: <TeamDescriptionPage/>,
            },
            {
                path: "/participants",
                element: <ParticipantsPage/>,
            },
            {
                path: "/participant/:id",
                element: <ProfilePage/>,
            },
            {
                path:"/login",
                element: <RegistrationPage/>
            },
            {
                path:"/profile",
                element: <ProfilePage/>
            },
            {
                path:"/registration",
                element: <RegistrationPage/>
            }
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
