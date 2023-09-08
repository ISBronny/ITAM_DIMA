import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter, Link, NavLink, Outlet,
  RouterProvider,
} from "react-router-dom";
import {Navbar} from "./components/Navbar";




function App() {
  return (
        <Navbar/>
  );
}

export default App;
