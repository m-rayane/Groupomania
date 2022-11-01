import '../../utils/style/header.scss';

import React, { useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';

import UserService from '../../api/Services/UserServices';

import { PostContext } from "../../utils/contexts/postContext";

import Logout from '../Auth/logout';

import {LogoSvg} from "../Atoms/svg/svg"

export default function Header() {
  const { tokenLS } = useContext(PostContext);
  
  const userServices = new UserService();

  const navigate = useNavigate();

  const [isConfirm, setIsConfirm] = useState(false);

  const handleLogoutConfirm = async (e) => {
      e.preventDefault();        
      localStorage.clear();
      navigate('/', { replace: true });
      window.location.reload();
      await userServices.logoutUser();

  }

  const handleLogoutCancel = (e) => {
      e.preventDefault();
      setIsConfirm(false)
      navigate('/', { replace: true });
  }


  return (
    <>
      <header>
        <div className="header__logo">
          <LogoSvg alt=""/>
        </div>
        <div className="header__nav">
          { !tokenLS ? (
            <></>
          ) : (
            <>
              <Link to="/">
                Home
              </Link>
              <Logout name="logout" isConfirm={isConfirm} onClick={() => setIsConfirm(true)} handleCancel={handleLogoutCancel} handleConfirm={handleLogoutConfirm} />
              <Link to="/createPost">
                Create a post
              </Link>
              <Link to="/profile">
                Profil
              </Link>
            </>
          )}
        </div>
      </header>
    </>
  )
}