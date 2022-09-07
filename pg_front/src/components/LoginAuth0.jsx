import React from "react";
import { useAuth0 } from "@auth0/auth0-react"


export default function LoginAuth0(){
    const { loginWithRedirect } = useAuth0();
    return (
        <button onClick={()=> loginWithRedirect()}>LOGIN</button>
    )
}