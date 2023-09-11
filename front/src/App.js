import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter, Link, NavLink, Outlet,
  RouterProvider,
} from "react-router-dom";
import {Navbar} from "./components/Navbar";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {ScrollToTopButton} from "./components/ScrollToTopButton";



function App() {
  return (
      <div class = "dark">
          <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
          />
          <div className="Outlet dark:bg-gray-900 min-h-[100vh]">
              <div className="min-h-full">
                  <Navbar/>
                  <ScrollToTopButton/>
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
