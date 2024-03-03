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
            navigate("/myGymsPage");
        }
    }, [])

    return (
        <div></div>
    )
}
