import '../../utils/style/modal.scss'
import './auth.scss'

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
// import { ConfirmModal } from "../Atoms/confirmModal";
import { ConfirmModal } from '../Atoms/modal';
import useModal from '../../utils/hooks/useModal';
import UserService from '../../api/Services/UserServices';

export default function Logout() {

    const { isShowing, toggle } = useModal();

    const userServices = new UserService()

    const navigate = useNavigate();

    const handleLogoutConfirm = async (e) => {
        e.preventDefault();
        
        localStorage.clear();
        navigate('/', { replace: true });
        window.location.reload();
        await userServices.logoutUser();
    }

    console.log(isShowing)

    return(

        <div id="logout">
        <button className="modal-toggle" onClick={toggle}>
          Logout
        </button>
        <ConfirmModal isShowing={isShowing} name="logout" confirmFunction={handleLogoutConfirm}>
            Logout
        </ConfirmModal>
        </div>
        // <ConfirmModal className="confirm__logout" confirmFunction={handleLogoutConfirm}>Logout</ConfirmModal>
    //     <div className="confirm__logout">
    //     <h2 className="">Are you sure to Logout ?</h2>
    //     <div className="">
    //         <button className="" onClick={() => navigate(-1)}>Cancel</button>
    //         <button className="" onClick={handleLogoutConfirm}>Logout</button>
    //     </div>
    //   </div>
    )
}

