import '../utils/style/postOffice.scss'

import { FormField, TextField } from '../components/Atoms/fields'
import CommentForm from '../components/Molecules/commentForm'
import Comment from '../components/Molecules/comment'

import { LikeButton, CommentButton } from '../components/Atoms/buttons'
import { PostButtons } from '../components/Molecules/postButtons'

import { StampedSvg } from '../components/Atoms/svg'
import { ModifyButtons } from '../components/Molecules/modifyButtons'

import React, { useContext, useState } from 'react'

import FormData from 'form-data'
import Moment from 'react-moment'
import ConfirmBox from '../components/Molecules/confirmBox'

import stamp from '../utils/images/stamp-rectangle-white.png'

import { PostContext } from '../utils/contexts/postContext'

import PostServices from '../api/Services/PostServices'
const postServices = new PostServices()

export default function PostOffice() {
  const { usersData, postsData, userIdData, getPosts, isLoading } =
    useContext(PostContext)

  const [isEdited, setIsEdited] = useState(false)
  const [isDeletePost, setIsDeletePost] = useState(false)
  const [isEditedComment, setIsEditedComment] = useState(false)
  const [isDeleteComment, setIsDeleteComment] = useState(false)
  const [targetPost, setTargetPost] = useState('')
  const [targetComment, setTargetComment] = useState('')
  const [error, setError] = useState('')

  // const [turnCard, setTurnCard] = useState('')

  const [postImage, setPostImage] = useState(null)

  const [isComDisplay, setIsComDisplay] = useState(false)

  return (
    <>
      {usersData &&
        userIdData &&
        postsData.map((post) => {
          //get the posterId of the post
          const poster = usersData.find(
            (userPoster) => userPoster._id === post.posterId
          )
          const isUserPost =
            poster &&
            (userIdData._id === poster._id || userIdData.isAdmin === 1)
          const isUserComment =
            poster &&
            (userIdData._id === poster._id || userIdData.isAdmin === 1)

          const handleImage = (e) => {
            setPostImage(e.target.files[0])
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

          const handleEditPost = (id) => {
            setIsEdited(!isEdited)
            setTargetPost(id)
          }

          const handleDeletePost = (id) => {
            setIsDeletePost(!isDeletePost)
            setTargetPost(id)
          }

          const editPost = async (e) => {
            e.preventDefault()
            const formData = new FormData()

            try {
              await postServices
                .putPost(post._id, formData)
                .then((res) => console.log(res))
              setIsEdited(!isEdited)
              setPostImage(null)
              // getPosts();
            } catch (error) {
              console.log(error)
            }
          }

          const deletePost = async () => {
            try {
              await postServices.deletePost(post._id)
              setIsDeletePost('')
              getPosts()
            } catch (error) {
              console.log(error)
            }
          }

          const handleDisplayComment = (id) => {
            setIsComDisplay(!isComDisplay)
            setTargetPost(id)
          }

          const submitComment = async (e) => {
            e.preventDefault()
            if (e.target['comment'].value.trim() === '') {
              e.target['comment'].value = ''
              setError('The content of your comment is invalid !')
            } else {
              const commentData = {
                commenterId: userIdData._id,
                text: e.target['comment'].value,
              }
              try {
                await postServices.postComment(post._id, commentData)
                e.target['comment'].value = ''
                setTargetPost(post._id)
                setIsComDisplay(true)
                getPosts()
              } catch (error) {
                console.log(error)
              }
            }
          }

          const handleEditCommentCancel = (e) => {
            e.preventDefault()
            document.getElementById('comment').value = ''
          }

          // const handleTurnCard = (id) => {
          //   turnCard === id ? setTurnCard('') : setTurnCard(id)
          // }

          return (
            <li
              // className={
              //   turnCard === post._id ? 'postCard turnCard' : 'postCard'
              // }
              className="postCard"
              key={post._id}
            >
              {isLoading ? (
                <div className="isLoading"></div>
              ) : (
                <>
                  <div className="postCard__front">
                    {(!isEdited || targetPost !== post._id) && (
                      <>
                        <div className="postCard__front__header">
                          {post._image === 'null' ? (
                            <div className="postCard__front__header__postImage">
                              No Picture
                            </div>
                          ) : (
                            <div className="postCard__front__header__postImage">
                              <img
                                src={post._image}
                                alt="illustration of the post"
                              />
                            </div>
                          )}
                          <div className="postCard__front__header__data">
                            <div className="postCard__front__header__data__stamp">
                              <StampedSvg />
                              <Moment
                                format="DD/MM/YY"
                                className="postCard__front__header__data__stamp__date"
                              >
                                {post.createdAt}
                              </Moment>
                            </div>
                          </div>
                          <div className="postCard__front__header__user">
                            <div className="postCard__front__header__user__name">
                              {poster._firstName} {poster._lastName}
                            </div>
                            <div className="postCard__front__header__user__picture">
                              <img
                                src={stamp}
                                className="postCard__front__header__user__picture__border"
                                alt=""
                              />
                              <img
                                src={poster._profilePicture}
                                className="postCard__front__header__user__picture__image"
                                alt=""
                              />
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
                                <LikeButton
                                  className="postCard__front__footer__like__btn"
                                  onClick={handleLike}
                                  value="like button"
                                />
                              </div>
                            ) : (
                              <div className="postCard__front__footer__like--unLike">
                                <LikeButton
                                  className="postCard__front__footer__like__btn"
                                  onClick={handleLike}
                                  value="unlike button"
                                />
                              </div>
                            )}
                            {post.likes}
                          </div>
                          <div className="postCard__front__footer__commentBtn">
                            <CommentButton
                              className="postCard__front__footer__comment__btn"
                              onClick={() => {
                                handleDisplayComment(post._id)
                              }}
                            />
                            {post._comments.length}
                          </div>
                          <div className="postCard__front__footer__date">
                            <Moment format="DD/MM/YYYY à HH:mm" className="">
                              {post.createdAt}
                            </Moment>
                          </div>
                          {isUserPost && (
                            <>
                              {isDeletePost && targetPost === post._id && (
                                <ConfirmBox
                                  name={'delete post'}
                                  className={'postCard__front__footer__modify'}
                                  handleCancel={() => {
                                    setIsDeletePost(!isDeletePost)
                                  }}
                                  handleCconfirm={deletePost}
                                />
                              )}
                              <div className="postCard__front__footer__modify">
                                <ModifyButtons
                                  className="postCard__front__footer__modify"
                                  editHandleClick={() => {
                                    handleEditPost(post._id)
                                  }}
                                  deleteHandleClick={() => {
                                    handleDeletePost(post._id)
                                  }}
                                  editValue=""
                                  deleteValue=""
                                />
                              </div>
                            </>
                          )}
                        </div>
                        <div className="postCard__front__comment">
                          {isComDisplay && targetPost === post._id && (
                            <>
                              {post._comments.map((comment) => {
                                const commenterData = usersData.find(
                                  (commenter) =>
                                    commenter._id === comment.commenterId
                                )
                                const isUserComment =
                                  commenterData._id === userIdData._id ||
                                  userIdData.isAdmin === 1

                                const deleteComment = async () => {
                                  const deleteCommentData = {
                                    commentId: comment._id,
                                  }
                                  try {
                                    await postServices.deleteComment(
                                      post._id,
                                      deleteCommentData
                                    )
                                    setIsDeleteComment('')
                                    getPosts()
                                  } catch (error) {
                                    console.log(error)
                                  }
                                }
                                const handleEditComment = (id) => {
                                  setIsEditedComment(!isEditedComment)
                                  setTargetComment(id)
                                }
                                const handleDeleteComment = (id) => {
                                  setIsDeleteComment(!isDeleteComment)
                                  setTargetComment(id)
                                }

                                const submitEditedComment = async (e) => {
                                  e.preventDefault()
                                  const commentData = {
                                    commentId: comment._id,
                                    commenterId: userIdData._id,
                                    text: e.target['comment'].value,
                                  }
                                  try {
                                    await postServices.putComment(
                                      post._id,
                                      commentData
                                    )
                                    setIsEditedComment(false)
                                    getPosts()
                                  } catch (error) {
                                    console.log(error)
                                  }
                                }
                                return (
                                  <div
                                    className="singleComment"
                                    key={comment._id}
                                  >
                                    {isDeleteComment &&
                                      targetComment === comment._id && (
                                        <ConfirmBox
                                          name={'delete comment'}
                                          className={
                                            'postCard__front__footer__modify'
                                          }
                                          handleCancel={() => {
                                            setIsDeleteComment(!isDeleteComment)
                                          }}
                                          handleCconfirm={deleteComment}
                                        />
                                      )}
                                    {(!isEditedComment ||
                                      targetComment !== comment._id) && (
                                      <Comment
                                        className="postCard__front__comment__content"
                                        comment={comment.text}
                                        borderImage={stamp}
                                        profilPicture={
                                          commenterData._profilePicture
                                        }
                                        firstName={commenterData._firstName}
                                        lastName={commenterData._lastName}
                                      />
                                    )}
                                    {isEditedComment &&
                                      targetComment === comment._id && (
                                        <>
                                          <CommentForm
                                            className="postCard__front__comment__content"
                                            comment={comment.text}
                                            profilPicture={
                                              commenterData._profilePicture
                                            }
                                            firstName={commenterData._firstName}
                                            lastName={commenterData._lastName}
                                            defaultValue={comment.text}
                                            handleCancel={() =>
                                              setIsEditedComment(false)
                                            }
                                            handleSubmit={submitEditedComment}
                                          />
                                        </>
                                      )}
                                    {isUserComment && (
                                      <div className="postCard__front__comment__content__modify">
                                        <ModifyButtons
                                          className="postCard__front__comment__content__modify"
                                          editHandleClick={() => {
                                            handleEditComment(comment._id)
                                          }}
                                          deleteHandleClick={() => {
                                            handleDeleteComment(comment._id)
                                          }}
                                          profilPicture={
                                            commenterData._profilePicture
                                          }
                                          firstName={commenterData._firstName}
                                          lastName={commenterData._lastName}
                                          editValue=""
                                          deleteValue=""
                                        />
                                      </div>
                                    )}
                                  </div>
                                )
                              })}
                            </>
                          )}
                          <CommentForm
                            className="postCard__front__comment__new"
                            borderImage={stamp}
                            profilPicture={userIdData.profilePicture}
                            firstName={userIdData.firstName}
                            lastName={userIdData.lastName}
                            handleSubmit={submitComment}
                            handleCancel={handleEditCommentCancel}
                          />
                        </div>
                        {/* <TurnButton
                          onClick={() => {
                            handleTurnCard(post._id)
                          }}
                        /> */}
                      </>
                    )}
                    {isEdited && targetPost === post._id && (
                      <>
                        <form className="postForm__front" onSubmit={editPost}>
                          <div className="postForm__front__header">
                            <div className="postForm__front__header__postImage">
                              <img
                                src={post._image}
                                alt="illustration of the post"
                              />
                              <FormField
                                className="postForm__front__header__fileChoice"
                                type="file"
                                name="postImage"
                                onChange={handleImage}
                              >
                                Choose a new image
                              </FormField>
                            </div>
                            <div className="postCard__front__header__data">
                              <div className="postCard__front__header__data__stamp">
                                <StampedSvg />
                                <Moment
                                  format="DD/MM/YY"
                                  className="postCard__front__header__data__stamp__date"
                                >
                                  {post.createdAt}
                                </Moment>
                              </div>
                            </div>
                            <div className="postCard__front__header__user">
                              <div className="postCard__front__header__user__name">
                                {poster._firstName} {poster._lastName}
                              </div>
                              <div className="postCard__front__header__user__picture">
                                <img
                                  src={stamp}
                                  className="postCard__front__header__user__picture__border"
                                  alt=""
                                />
                                <img
                                  src={poster._profilePicture}
                                  className="postCard__front__header__user__picture__image"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                          <div className="postForm__front__content">
                            <TextField
                              className="postForm__front__content__message"
                              name="editedPostMessage"
                              rows="10"
                              wrap="hard"
                              defaultValue={post.message}
                            ></TextField>
                          </div>
                          <div className="postForm__front__footer">
                            <div className="postForm__front__footer__createPostBtn">
                              <PostButtons
                                className="postForm__front__footer__createPostBtn"
                                cancelHandleClick={() => setIsEdited(false)}
                              />
                            </div>
                          </div>
                        </form>
                      </>
                    )}
                  </div>
                  {/* <div className="postCard__back">
                    <img src={post._image} alt="illustration of the post" />
                  </div> */}
                </>
              )}
            </li>
          )
        })}
    </>
  )
}
