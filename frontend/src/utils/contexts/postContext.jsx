import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import UserService from '../../api/Services/UserServices'
import PostService from '../../api/Services/PostServices'
const userServices = new UserService()
const postServices = new PostService()

export const PostContext = createContext({})

export const PostProvider = ({ children }) => {
  const [usersData, setUsersData] = useState([])
  const [userIdData, setUserIdData] = useState([])
  const [postsData, setPostsData] = useState([])
  const tokenLS = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  const expirationDate = localStorage.getItem('expirationDate')
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    if (expirationDate && expirationDate * 1000 < Date.now()) {
      localStorage.clear()
      navigate('/login', { replace: true })
      userServices.logoutUser()
    }
  }, [expirationDate, navigate])

  useEffect(() => {
    if (userId) {
      const getUserId = async () => {
        setIsLoading(true)
        const response = await userServices.getUserId(userId)
        setUserIdData(response)
        setIsLoading(false)
      }
      getUserId()
    } else {
      console.log('User not connected')
      localStorage.clear()
      navigate('/login', { replace: true })
    }
  }, [userId, navigate])

  useEffect(() => {
    if (userId) {
      const getUsers = async () => {
        setIsLoading(true)
        const response = await userServices.getUser()
        setUsersData(response)
        setIsLoading(false)
      }
      getUsers()
    }
  }, [userId])

  useEffect(() => {
    if (userId) {
      const getPosts = async () => {
        setIsLoading(true)
        const response = await postServices.getPost()
        setPostsData(response.reverse())
        setIsLoading(false)
      }
      getPosts()
    }
  }, [userId])

  // function for re-rendering on every new api call
  const getPosts = async () => {
    const reRender = async () => {
      const reqRes = await postServices.getPost()
      setPostsData(reqRes.reverse())
    }
    reRender()
  }

  // function for dispatching DOM rendering on users api call
  const getUserId = async () => {
    const reRender = async () => {
      const reqRes = await userServices.getUserId()
      setUserIdData(reqRes)
    }
    reRender()
  }
  // function for dispatching DOM rendering on user api call
  const getUsers = async () => {
    const reRender = async () => {
      const reqRes = await userServices.getUser()
      setUsersData(reqRes)
    }
    reRender()
  }

  return (
    <PostContext.Provider
      value={{
        usersData,
        userIdData,
        postsData,
        tokenLS,
        isLoading,
        getPosts,
        getUserId,
        getUsers,
        setIsLoading,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}
