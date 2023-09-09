import {RegisterForm} from "../components/auth/RegisterForm";
import {LoginForm} from "../components/auth/LoginForm";

export const RegistrationPage = () => {
    return(
       <>
           <div className="grid grid-cols-1 lg:grid-cols-2 my-20">
               <RegisterForm/>
               <LoginForm/>
           </div>
       </>
    );
}
