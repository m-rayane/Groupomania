import "../utils/style/postOffice.scss";

import {FormField, TextField} from  "../components/Atoms/Form/formField";
import CommentForm from "../components/Molecules/commentForm";
import Comment from "../components/Molecules/comment";

import { LikeButton, CommentButton } from "../components/Atoms/buttons";
import { ModifyButtons } from "../components/Molecules/modifyButtons";

import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FormData from "form-data";
import Moment from "react-moment";

import stamp from "../utils/images/stamp-rectangle-white.png";

import { PostContext } from "../utils/contexts/postContext";

import PostServices from "../api/Services/PostServices";
const postServices = new PostServices();

export default function PostOffice() {
    const { usersData, postsData, userIdData, getPosts, tokenLS, isLoading } = useContext(PostContext)
    const navigate = useNavigate();

    const [isEdited, setIsEdited] = useState(false);
    const [isEditedComment, setIsEditedComment] = useState(false);
    const [targetPost, setTargetPost] = useState("");
    const [targetComment, setTargetComment] = useState("");

    const [postImage, setPostImage] = useState(null);

    const [isComDisplay, setIsComDisplay] = useState(false);

    useEffect(() => {
        if (!tokenLS) {
            navigate("/login", { replace: true });
        }
        });

    return (        
        <>
            {usersData &&
            userIdData &&
            postsData.map((post, index) => {
                //get the posterId of the post
                const poster = usersData.find((userPoster) => userPoster._id === post.posterId);
                const isUserPost = poster && (userIdData._id === poster._id || userIdData.isAdmin === 1);
                const isUserComment = poster && (userIdData._id === poster._id || userIdData.isAdmin === 1);

                const handleImage = (e) => {
                setPostImage(e.target.files[0]);
                }

                const isUserLiked = post._usersLiked.includes(userIdData._id);

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

                const handleEditPost = (id) => {
                    setIsEdited(!isEdited)
                    setTargetPost(id)
                    }

                const editPost = async (e) => {
                    e.preventDefault();
                    const formData = new FormData();

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


                const handleDisplayComment = (id) => {
                        setIsComDisplay(!isComDisplay);
                        setTargetPost(id);

                }
                const submitComment= async (e) => {
                    e.preventDefault()                
                    const commentData = {
                        commenterId: userIdData._id,
                        text: e.target["comment"].value,
                    }
                    try {
                        await postServices.postComment(post._id, commentData)
                        e.target["comment"].value = ""
                        setIsComDisplay(true)
                        getPosts()
                    } catch (error) {
                        console.log(error)
                    }
                }

                const handleEditCommentCancel = (e) => {
                    e.preventDefault();
                    document.getElementById("comment").value = "";
                }

                return (
                                                
                    <li className="postCard" key={index}>
                        {isLoading ? (
                            <div className="isLoading"></div>
                        ) : (
                            <div>
                                <div className="postCard__front">
                                    {(!isEdited || targetPost !== post._id) && (
                                    <>
                                        <div className="postCard__front__header">
                                            {post._image === "null" ? (
                                                <div className="postCard__front__header__postImage">
                                                    No Picture
                                                </div>
                                            ) : (
                                                <div className="postCard__front__header__postImage">
                                                    <img src={post._image} alt="illustration of the post" />
                                                </div>
                                            )}
                                            <div className="postCard__front__header__user">
                                                <div className="postCard__front__header__user__name">
                                                    Send by {poster._firstName} {poster._lastName} il y a ...
                                                </div>
                                                <div className="postCard__front__header__user__picture">
                                                    <img src={stamp} className="postCard__front__header__user__picture__border" alt="" />
                                                    <img src={poster._profilePicture} className="postCard__front__header__user__picture__image" alt="" />
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
                                            <div className="postCard__front__footer__commentBtn">
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
                                                <div className="postCard__front__footer__modify">
                                                    <ModifyButtons className="postCard__front__footer__modify" editHandleClick={() => {handleEditPost(post._id)}} deleteHandleClick={deletePost} editValue="" deleteValue="" />
                                                </div>
                                            </>
                                            )}
                                        </div>
                                        <div className="postCard__front__comment">
                                            {(isComDisplay && targetPost === post._id) && (
                                                <>
                                                {
                                                    post._comments.map((comment, index) => {
                                
                                                        const commenterData = usersData.find((commenter) => commenter._id === comment.commenterId);
                                                        const isUserComment = commenterData._id === userIdData._id || userIdData.isAdmin === 1;
                                                        const deleteComment = async () => {
                                                            const deleteCommentData = {
                                                                commentId: comment._id
                                                            }
                                                            try {
                                                                    await postServices.deleteComment(post._id, deleteCommentData)
                                                            getPosts()
                                                            } catch (error) {
                                                            console.log(error)
                                                            }
                                                        }
                                                        const handleEditComment = (id) => {
                                                            setIsEditedComment(!isEditedComment)
                                                            setTargetComment(id)
                                                            }
                                
                                                        const submitEditedComment= async (e) => {
                                                            e.preventDefault()
                                                            const commentData = {
                                                                commentId: comment._id,
                                                                commenterId: userIdData._id,
                                                                text: e.target["comment"].value,
                                                            }
                                                            try {
                                                                await postServices.putComment(post._id, commentData)
                                                                setIsEditedComment(false)
                                                                getPosts()
                                                            } catch (error) {
                                                                console.log(error)
                                                            }
                                                        }
                                                        return (
                                                            <div className="singleComment" key={index}>
                                                                {(!isEditedComment || targetComment !== comment._id) && (
                                                                    <Comment className="postCard__front__comment__content" comment={comment.text} profilPicture={commenterData._profilePicture} firstName={commenterData._firstName} lastName={commenterData._lastName} />
                                                                )}
                                                                {isEditedComment && targetComment === comment._id && (
                                                                    <>
                                                                        <CommentForm className="postCard__front__comment__content" comment={comment.text} profilPicture={commenterData._profilePicture} firstName={commenterData._firstName} lastName={commenterData._lastName} defaultValue={comment.text} handleCancel={() => setIsEditedComment(false)} handleSubmit={submitEditedComment}/>
                                                                    </>
                                                                )}
                                                                {isUserComment && (
                                                                    <div className="postCard__front__comment__content__modify">
                                                                        <ModifyButtons className="postCard__front__comment__content__modify" editHandleClick={() => {handleEditComment(comment._id)}} deleteHandleClick={deleteComment} profilPicture={commenterData._profilePicture} firstName={commenterData._firstName} lastName={commenterData._lastName} editValue="" deleteValue="" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )
                                                    })
                                                }
                                                </>
                                            )}
                                            <CommentForm className="postCard__front__comment__new" profilPicture={userIdData.profilePicture} firstName={userIdData.firstName} lastName={userIdData.lastName} handleSubmit={submitComment} handleCancel={handleEditCommentCancel}/>
                                        </div>
                                    </>
                                    )}
                                    {isEdited && targetPost === post._id && (
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
                        )}
                    </li>
                    
                )
            })
            }
        </>
    )
}

