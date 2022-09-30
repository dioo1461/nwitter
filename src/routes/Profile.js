import { authService } from "fBase";
import {useNavigate, } from 'react-router-dom';
import React from "react";

export default () => {
    const navigate = useNavigate();
    const onLogOutClick = () => {
        authService.signOut();
        navigate(-1);
    }
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};