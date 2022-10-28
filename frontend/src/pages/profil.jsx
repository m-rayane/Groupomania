import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { PostContext } from "../utils/contexts/postContext";

import UserService from '../api/Services/UserServices';
const userServices = new UserService();

export default function Profil() {
    const { userIdData, tokenLS } = useContext(PostContext)

    const navigate = useNavigate();

    useEffect(() => {
        if (!tokenLS) {
            navigate("/login", { replace: true });
        }
      });

    return (
        <div className="profil">
            <div className="profil__header">
                <div className="profil__header__picture">

                </div>
                <div className="profil__header__infos">
                    
                </div>
            </div>
            <div className="profil__content">

            </div>
        </div>
    )
};