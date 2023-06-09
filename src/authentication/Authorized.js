import { useContext, useEffect, useState } from "react";
import { logout } from "./HandleJWT";
import AuthenticationContext from "./AuthenticationContext";

function Authorized(props){
    const[isAuthorized,setIsAuthorized] = useState(false);
    const {claims} = useContext(AuthenticationContext);
    
    useEffect(() => {
        setIsAuthorized(claims.length > 0)
    }, [claims])
    return(
        <>
            {isAuthorized ? props.authorized : props.notAuthorized}
        </> 
    )
}

export default Authorized