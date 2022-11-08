import '../../utils/style/header.scss'

import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import UserService from '../../api/Services/UserServices'

import { PostContext } from '../../utils/contexts/postContext'

import Logout from '../Auth/logout'

import { LogoSvg, PostOfficeSvg, CreatePostSvg, ProfileSvg } from '../Atoms/svg'

export default function Header() {
  const { tokenLS } = useContext(PostContext)

  const userServices = new UserService()

  const navigate = useNavigate()

  const [isConfirm, setIsConfirm] = useState(false)

  const handleLogoutConfirm = async (e) => {
    e.preventDefault()
    localStorage.clear()
    setIsConfirm('')
    navigate('/login', { replace: true })
    // window.location.reload()
    await userServices.logoutUser()
  }

  const handleLogoutCancel = (e) => {
    e.preventDefault()
    setIsConfirm(false)
    navigate('/', { replace: true })
  }

  return (
    <>
      <header className="header">
        <Link to="/">
          <div className="header__logo">
            <LogoSvg alt="" />
          </div>
        </Link>
        <div className="header__nav">
          {!tokenLS ? (
            <></>
          ) : (
            <>
              <Link to="/">
                <div className="header__nav__postOffice">
                  <PostOfficeSvg />
                </div>
              </Link>
              <Link to="/createPost">
                <div className="header__nav__createPost">
                  <CreatePostSvg />
                </div>
              </Link>
              <Link to="/profile">
                <div className="header__nav__profile">
                  <ProfileSvg />
                </div>
              </Link>
              <Logout
                name="logout"
                className="header__nav__logout"
                isConfirm={isConfirm}
                onClick={() => setIsConfirm(true)}
                handleCancel={handleLogoutCancel}
                handleConfirm={handleLogoutConfirm}
              />
            </>
          )}
        </div>
      </header>
    </>
  )
}
