import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../provider/userProvider";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
    const location = useLocation()
    const {user} = useUser()



    if(!user){
        return <Navigate to={"/login"} state={{from : location}} replace/>
    }
    return children
};

export default PrivateRoute;