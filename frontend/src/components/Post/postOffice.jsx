import './postOffice.scss';

import {FormField, TextField} from  "../Atoms/Form/formField";
import CommentForm from '../Molecules/comment';
// import heartSvg from '../../utils/images/svg/heart.svg'
import { EditSvg, DeleteSvg } from '../Atoms/svg/svg';
import { LikeButton, CommentButton } from '../Atoms/buttons';
import { ModifyButtons } from '../Molecules/modifyButtons';

import React, { useContext, useState, useEffect } from "react";

import FormData from "form-data";
import Moment from 'react-moment';



import { PostContext } from "../../utils/contexts/postContext";

import PostServices from '../../api/Services/PostServices';
const postServices = new PostServices();


// import { useNavigate } from 'react-router-dom';



// api
// import PostService from '../../api/Services/PostServices'
// const postServices = new PostService()

export default function PostOffice() {
    const { usersData, postsData, userIdData, getPosts } = useContext(PostContext)

    const [isEdited, setIsEdited] = useState(false);
    const [targetElement, setTargetElement] = useState('');

    const [postImage, setPostImage] = useState(null);

    const [isComDisplay, setIsComDisplay] = useState(false);

    return (        
        <>
            {usersData &&
            userIdData &&
            postsData.map((post, index) => {
                //get the posterId of the post
                const poster = usersData.find((userPoster) => userPoster._id === post.posterId);
                const isUserPost = poster && (userIdData._id === poster._id || userIdData.isAdmin === 1);

                const handleEditPost = (id) => {
                    setIsEdited(!isEdited)
                    setTargetElement(id)
                  }

                const handleImage = (e) => {
                setPostImage(e.target.files[0]);
                }

                const isUserLiked = post._usersLiked.includes(userIdData._id)

                const handleLike = async (e) => {
                    e.preventDefault()
                    // if the user like an article
                    if (post._usersLiked.includes(userIdData._id)) {
                        const unlikeData = {
                            like: 0,
                            userId: userIdData._id,
                          }
                          await postServices.postLike(post._id, unlikeData) 
                          getPosts()
                    } else {
                        const likeData = {
                            like: 1,
                            userId: userIdData._id,
                          }
                          await postServices.postLike(post._id, likeData)
                          getPosts()
                    }
                }
  
                const editPost = async (e) => {
                    e.preventDefault()
                    const formData = new FormData()
                    if (postImage === null) {                        
                        formData.append('posterId', userIdData._id);
                        formData.append('message', e.target['editedPostMessage'].value);
                        formData.append('isAdmin', userIdData.isAdmin);
                    } else {
                        formData.append('posterId', userIdData._id);
                        formData.append('message', e.target['editedPostMessage'].value);
                        formData.append('isAdmin', userIdData.isAdmin);
                        formData.append('image', postImage);
                     }
                    try {
                        await postServices.putPost(post._id, formData)
                        .then ((res) => console.log(res));
                        setIsEdited(!isEdited);
                        setPostImage(null);
                        getPosts();
                    } catch (error) {
                        console.log(error);
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


                const handleDisplayComment = async (id) => {
                    setIsComDisplay(!isComDisplay);
                    setTargetElement(id);
                }

                const handleComment= async (e) => {
                    e.preventDefault()                
                    const commentData = {
                        commenterId: userIdData._id,
                        commenterFirstName: userIdData.firstName,
                        commenterLastName: userIdData.lastName,
                        commenterProfilePicture: userIdData.profilePicture,
                        text: e.target['comment'].value,
                    }
                    try {
                      await postServices.postComment(post._id, commentData)
                      e.target['comment'].value = ''
                      setIsComDisplay(false)
                      getPosts()
                    } catch (error) {
                      console.log(error)
                    }
                  }

                return (
                                                
                    <li className="postCard" key={index}>
                        <div>
                            
                            <div className="postCard__front">

                                {(!isEdited || targetElement !== post._id) && (
                                <>
                                    <div className="postCard__front__header">
                                        <div className="postCard__front__header__postImage">
                                            <img src={post._image} alt="illustration of the post" />
                                        </div>
                                        <div className="postCard__front__header__user">
                                            <div className="postCard__front__header__user__name">
                                                Send by {poster._firstName} {poster._lastName}
                                            </div>
                                            <div className="postCard__front__header__user__picture">
                                                
                                                <img src={poster._profilePicture} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="postCard__front__content">
                                        {post.message}
                                    </div>
                                    <div className="postCard__front__footer">
                                        <div className="postCard__front__footer__like">
                                            {isUserLiked ? (
                                                <div className="postCard__front__footer__like--isLike">
                                                    <LikeButton className="postCard__front__footer__like__btn" onClick={handleLike} value="like button"/>
                                                </div>
                                            
                                            ) : (
                                                <div className="postCard__front__footer__like--unLike">
                                                    <LikeButton className="postCard__front__footer__like__btn" onClick={handleLike} value="unlike button"/>
                                                </div>
                                            )}
                                            {post.likes}
                                        </div>                                        
                                        <div className="postCard__front__footer__comment">
                                            <CommentButton className="postCard__front__footer__comment__btn" onClick={() => {handleDisplayComment(post._id)}}/>
                                            {post._comments.length}
                                        </div>                                       
                                        <div className="postCard__front__footer__date">
                                            <Moment format="DD/MM/YYYY à HH:mm" className="">
                                                {post.createdAt}
                                            </Moment>
                                        </div>

                                        {isUserPost && (
                                        <>
                                            <div className="postCard__front__footer__btn">
                                                <ModifyButtons className="postCard__front__footer__btn" editHandleClick={() => {handleEditPost(post._id)}} deleteHandleClick={deletePost} editValue="" deleteValue="" />
                                            </div>
                                        </>
                                        )}
                                    </div>
                                    {isComDisplay && targetElement === post._id && (
                                        <div className="postCard__front__comment">
                                        <CommentForm className="postCard__front__comment__form" onSubmit={handleComment} onClick={() => setIsComDisplay(false)}/> 
                                    </div>

                                    )}
      
                                </>
                                )}


                                {isEdited && targetElement === post._id && (
                                <>
                                    <form className="postForm__front" onSubmit={editPost}>
                                        <div className="postForm__front__header">
                                            <div className="postForm__front__header__postImage">
                                                <img src={post._image} alt="illustration of the post" />
                                                <FormField className="postForm__front__header__fileChoice" type ="file" name="postImage" onChange={handleImage}>Choose a new image</FormField>
                                            </div>
                                        <div className="postForm__front__header__user">
                                            <div className="postForm__front__header__user__name">
                                                Send by {poster._firstName} {poster._lastName}
                                            </div>
                                            <div className="postForm__front__header__user__picture">
                                                <img src={poster._profilePicture} alt="" />
                                            </div>
                                        </div>
                                        </div>
                                            <div className="postForm__front__content">
                                                <TextField className="postForm__front__content__message" name="editedPostMessage" rows="10" wrap="hard" defaultValue={post.message}></TextField>
                                            </div>
                                        <div className="postForm__front__footer">
                                            <div>
                                                <button className="postForm__front__footer__btn" onClick={() => setIsEdited(false)}>Cancel</button>
                                                <button className="postForm__front__footer__btn">Post</button>
                                            </div>
                                        </div>
                                    </form>
                                </>
                                )}

                                </div>
                            <div className="postCard__back">
                            </div>
                        </div>
                    </li>
                   
                )
            })
            }
        </>
    )
}

