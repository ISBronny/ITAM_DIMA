import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter, Link, NavLink, Outlet,
  RouterProvider,
} from "react-router-dom";
import {Navbar} from "./components/Navbar";




function App() {
  return (
      <div class = "dark">
          <div className="Outlet dark:bg-gray-900 min-h-[100vh]">
            <div className="min-h-full">
              <Navbar/>
              <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                  <Outlet />
                </div>
              </main>
            </div>
          </div>
      </div>

  );
}

export default App;
