import { useContext, useEffect, useState } from "react";
import { getClaims, logout } from "./HandleJWT";
import AuthenticationContext from "./AuthenticationContext";

function Authorized(props){
    const[isAuthorized,setIsAuthorized] = useState(false);
    let {claims} = useContext(AuthenticationContext);
    claims = getClaims();
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