import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import AppConstants from '../config/app_constants';

export default function Splash() {
    // use navigation
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem(AppConstants.keyToken) === null) {
            navigate("/registerPage");
        } else {
            if (localStorage.getItem(AppConstants.keyRoleId)=== "5") {
                navigate("/schedulePage")
            } else {
                navigate("/myGymsPage");
            }
        }
    }, [])
    return (
        <div></div>
    )
}
