import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from 'react-router-dom';



export const ConfirmModal = ({ isShowing, name, confirmFunction, children }) => {

    const navigate = useNavigate();
    const navigateBack = () => {
       navigate(-1)
    }
    const handleLogoutCancel = (e) => {
        e.preventDefault();
        navigateBack();
        window.location.reload();
    }
    if (isShowing) {
        return (
            <>
    <div className={'confirm__' + children}>
        <h2 className={name + '__title'}>Are you sure to Logout ?</h2>
        <div className={name + '__choice'}>
            <button className={name + '__cancel'} onClick={handleLogoutCancel}>Cancel</button>
            <button className={name + '__confirm'} onClick={confirmFunction}>{children}</button>
        </div>
      </div>
            </>)
    }};



