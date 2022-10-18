import './postOffice.scss';

import {FormField, TextField} from  "../Atoms/Form/formField";

import React, { useContext, useState } from "react";

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


    return (        
        <>
            {usersData &&
            userIdData &&
            postsData.map((post, index) => {
                //get the posterId of the post
                const poster = usersData.find((u) => u._id === post.posterId);
                const isUserPost = poster && (userIdData._id === poster._id || userIdData.isAdmin === 1);
                

                const handleEditPost = (id) => {
                    setIsEdited(!isEdited)
                    setTargetElement(id)
                  }


                const handleImage = (e) => {
                setPostImage(e.target.files[0]);
                }



                const editPost = async (e) => {
                    e.preventDefault()
                    console.log(e.target['editedPostMessage'].value);
                    console.log(postImage)
                    const formData = new FormData()
                    if (postImage === null) {                        
                        formData.append('message', e.target['editedPostMessage'].value);
                    } else {    
                        formData.append('message', e.target['editedPostMessage'].value);
                        formData.append('image', postImage);
                    }


                    console.log(...formData)

                    try {
                        await postServices.putPost(post._id, formData)
                        .then ((res) => console.log(res));
                        setIsEdited(!isEdited)
                        setPostImage(null)
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
                
    

                  console.log(isEdited);

                return (
                    <>
                        <li className="postCard" key={index}>
                            <div>
                
                                <div className="postCard__front">

                                    {(isEdited === false || targetElement !== post._id) && (
                                    <>
                                        <div className="postCard__front__header">
                                            <div className="postCard__front__header__postImage">
                                                <img src={post._image} alt="illustration of the post" />
                                            </div>
                                        <div className="postCard__front__header__user">
                                            <div className="postCard__front__header__user__name">
                                                Send by {poster.firstName} {poster.lastName}
                                            </div>
                                            <div className="postCard__front__header__user__picture">
                                                <img src={poster.profilePicture} alt="" />
                                            </div>
                                        </div>
                                        </div>
                                            <div className="postCard__front__content">
                                                {post.message}
                                            </div>
                                        <div className="postCard__front__footer">
                                            {isUserPost && (
                                            <>
                                                <div className="postCard__front__footer__date">
                                                    <Moment format="DD/MM/YYYY à HH:mm" className="">
                                                        {post.createdAt}
                                                    </Moment>
                                                </div>
                                                <div className="postCard_front__footer__btn">
                                                    <button className="postCard_front__footer__btn__cancel" onClick={() => {handleEditPost(post._id)}}>Edit</button>
                                                    <button className="postCard_front__footer__btn__confirm" onClick={deletePost}>Delete</button>
                                                </div>
                                            </>
                                            )}
                                        </div>
                                    </>
                                    )}


                                    {isEdited === true && targetElement === post._id && (
                                    <><form className="postForm__front" onSubmit={editPost}>
                                            <div className="postForm__front__header">
                                                <div className="postForm__front__header__postImage">
                                                    <img src={post._image} alt="illustration of the post" />
                                                    <FormField className="postForm__front__header__fileChoice" type ="file" name="postImage" onChange={handleImage}>Choose a new image</FormField>
                                                </div>
                                            <div className="postForm__front__header__user">
                                                <div className="postForm__front__header__user__name">
                                                    Send by {poster.firstName} {poster.lastName}
                                                </div>
                                                <div className="postForm__front__header__user__picture">
                                                    <img src={poster.profilePicture} alt="" />
                                                </div>
                                            </div>
                                            </div>
                                                <div className="postForm__front__content">
                                                    <TextField className="postForm__front__content__message" name="editedPostMessage" wrap="hard" defaultValue={post.message}></TextField>
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
                    </>
                )
            })
            }
        </>
    )
}

