import '../../utils/style/modal.scss'
import './auth.scss'

import React from "react";
import { useNavigate } from 'react-router-dom';
import { ConfirmModal } from "../Atoms/confirmModal";


export default function Logout() {
    const navigate = useNavigate();

    const handleLogoutConfirm = (e) => {
        e.preventDefault();
        localStorage.clear();
        navigate('/', { replace: true });
        window.location.reload();
    }

    return(
        <ConfirmModal className="confirm__logout" confirm={handleLogoutConfirm}>logout</ConfirmModal>
    )
}