import React, { createContext, useState, useEffect } from "react";

import UserService from '../../api/Services/UserServices'
import PostService from '../../api/Services/PostServices'
const userServices = new UserService()
const postServices = new PostService()

export const PostContext = createContext({});

export const PostProvider = ({ children }) => {
  const [usersData, setUsersData] = useState([]);
  const [userIdData, setUserIdData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const tokenLS = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  // console.log(userId)

  useEffect(() => {
    const getUserId = async () => {
      const res = await userServices.getUserId(userId);
      setUserIdData(res);
    }
    userId ? getUserId() : console.log("User not connected");
  }, [userId])

  useEffect(() => {
    const getUsers = async () => {
      const res = await userServices.getUser()
      setUsersData(res)
    }
    getUsers()
  }, [])

  useEffect(() => {
    const getPosts = async () => {
      const res = await postServices.getPost()
      setPostsData(res.reverse())
    }
    getPosts()
  }, [])

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
      getPosts,
      getUserId,
      getUsers
    }}
    >
      {children}
    </PostContext.Provider>
  )
}
