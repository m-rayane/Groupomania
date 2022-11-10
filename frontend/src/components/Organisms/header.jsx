import '../../utils/style/header.scss'

import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import UserService from '../../api/Services/UserServices'
import { PostContext } from '../../utils/contexts/postContext'

import Logout from './logout'
import { LogoSvg, PostOfficeSvg, CreatePostSvg, ProfileSvg } from '../Atoms/svg'

export default function Header() {
  const { userId } = useContext(PostContext)
  const userServices = new UserService()
  const navigate = useNavigate()

  const [isConfirm, setIsConfirm] = useState(false)
  const [scrollUp, setScrollUp] = useState('')
  const [scrollDown, setScrollDown] = useState('')

  const handleLogoutCancel = (e) => {
    e.preventDefault()
    setIsConfirm(false)
    navigate('/', { replace: true })
  }

  const handleLogoutConfirm = async (e) => {
    e.preventDefault()
    localStorage.clear()
    setIsConfirm('')
    navigate('/login', { replace: true })
    // window.location.reload()
    await userServices.logoutUser()
  }

  // to set class scrollUp and scrollDown to header section
  useEffect(() => {
    const handleScroll = (event) => {
      if (window.scrollY > 70) {
        setScrollUp('scrollUp')
        setScrollDown('')
      } else {
        setScrollUp('')
        setScrollDown('scrollDown')
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrollUp])

  // to scroll to top
  const handleScrollTop = () => {
    window.scrollTo(0, 0)
  }

  return (
    <>
      <header className={'header ' + scrollUp + scrollDown}>
        <Link to="/">
          <div className="header__logo" onClick={handleScrollTop}>
            <LogoSvg alt="" />
          </div>
        </Link>
        <div className="header__nav">
          {!userId ? (
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
