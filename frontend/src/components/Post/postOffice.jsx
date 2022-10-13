import './postOffice.scss';

import React, { useContext, useState } from "react";
// import Moment from 'react-moment'; 

import { ConfirmModal } from '../Atoms/confirmModal';

import { PostContext } from "../../utils/contexts/postContext";

import PostServices from '../../api/Services/PostServices';
const postServices = new PostServices();



// import { useNavigate } from 'react-router-dom';



// api
// import PostService from '../../api/Services/PostServices'
// const postServices = new PostService()

export default function PostOffice() {
    const { usersData, postsData, userIdData, getPosts } = useContext(PostContext)

    const [isEdited, setIsEdited] = useState(false)
    const [postEdited, setPostEdited] = useState(null)


    return (        
        <>
            {usersData &&
            userIdData &&
            postsData.map((post, index) => {
                //get the posterId of the post
                const poster = usersData.find((u) => u._id === post.posterId)

                const editPost = async (e) => {
                    e.preventDefault()
        
                    const data = {
                      posterId: poster._id,
                      message: postEdited,
                    }
                    try {
                      await postServices.putPost(post._id, data)
                      setIsEdited(!isEdited)
                      getPosts()
                    } catch (error) {
                      console.log(error)
                    }
                  }

                const deletePost = async () => {
                    try {
                    await postServices.deletePost(post._id)
                    getPosts()
                    } catch (error) {
                    console.log(error)
                    }
                 }
            


                return (
                    <>
                        <div className="postCard">
                            <div className="postCard__header">
                                <div className="postCard__header__postImage">
                                    <img src={post._image} alt="test" />
                                </div>
                                <div className="postCard__header__logo">
                                    
                                </div>
                                <div className="postCard__header__user">
                                    <div className="postCard__header__user__name">
                                        Send by {poster.firstName} {poster.lastName}
                                    </div>
                                    <div className="postCard__header__user__picture">
                                        <img src={poster.profilePicture} alt="" />
                                    </div>                                
                                </div>
                                <div className="postCard__header__user__">

                                </div>
                            </div>
                            <div className="postCard__content">
                                <div className="postCard__content__message">
                                    {post.message}
                                </div>
                                <div className="postCard__content__update">
                                        <button onClick={(e) => editPost(e)} className="postCard__content__update__edit">
                                        Edit
                                        </button>
                                        <button onClick={(e) => deletePost()} className="postCard__content__update__delete">
                                        Delete
                                        </button>
                                </div>
                            </div>
                        </div>
                        <div className="postCard__back">

                        </div>
                    </>
                )
            })
            }
        </>
    )
}

{/* <div className="postCard__header__date">
<Moment
format="DD/MM/YYYY à HH:mm"
className=""
>
{post.createdAt}
</Moment>
</div> */}