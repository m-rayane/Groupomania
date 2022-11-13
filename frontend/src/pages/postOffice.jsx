import '../utils/style/postOffice.scss'

import React, { useContext, useState } from 'react'
import FormData from 'form-data'
import Moment from 'react-moment'

import { StampedSvg } from '../components/Atoms/svg'
import { LikeButton, CommentButton } from '../components/Atoms/buttons'
import { FormField, TextField } from '../components/Atoms/fields'
import { PostButtons } from '../components/Molecules/postButtons'
import CommentForm from '../components/Molecules/commentForm'
import Comment from '../components/Molecules/comment'
import { ModifyButtons } from '../components/Molecules/modifyButtons'
import ConfirmBox from '../components/Molecules/confirmBox'
import stamp from '../utils/images/stamp-rectangle-white.png'

import { PostContext } from '../utils/contexts/postContext'
import PostServices from '../api/Services/PostServices'

const postServices = new PostServices()

export default function PostOffice() {
  const {
    usersData,
    postsData,
    userIdData,
    getPosts,
    isLoading,
    setIsLoading,
  } = useContext(PostContext)

  const [isEdited, setIsEdited] = useState(false)
  const [isDeletePost, setIsDeletePost] = useState(false)
  const [isEditedComment, setIsEditedComment] = useState(false)
  const [isDeleteComment, setIsDeleteComment] = useState(false)
  const [targetPost, setTargetPost] = useState('')
  const [targetComment, setTargetComment] = useState('')
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
          // to determine if the user is the poster or an admin
          const isUserPost =
            poster &&
            (userIdData._id === poster._id || userIdData.isAdmin === 1)

          // to prevent request delay
          if (poster === undefined) {
            setIsLoading(true)
          }

          // to set the chosen image in state
          const handleImage = (e) => {
            setPostImage(e.target.files[0])
          }

          // to determine if the user already liked the post
          const isUserLiked = post._usersLiked.includes(userIdData._id)

          // when click and the like button
          const handleLike = async (e) => {
            e.preventDefault()
            // if the user already like the post => send "unliking" data
            if (post._usersLiked.includes(userIdData._id)) {
              const unlikeData = {
                like: 0,
                userId: userIdData._id,
              }
              await postServices.postLike(post._id, unlikeData)
              getPosts()
              // else the user like the post => send "liking" data
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

          // to edit a post
          const editPost = async (e) => {
            e.preventDefault()
            const formData = new FormData()
            if (postImage === null) {
              formData.append('editerId', userIdData._id)
              formData.append('isAdmin', userIdData.isAdmin)
              formData.append('message', e.target['editedPostMessage'].value)
            } else {
              formData.append('editerId', userIdData._id)
              formData.append('isAdmin', userIdData.isAdmin)
              formData.append('message', e.target['editedPostMessage'].value)
              formData.append('image', postImage)
            }
            try {
              await postServices
                .putPost(post._id, formData)
                .then((res) => console.log(res))
              setIsEdited(!isEdited)
              setPostImage(null)
              getPosts()
            } catch (error) {
              console.log(error)
            }
          }

          // to delete a post
          const deletePost = async () => {
            try {
              await postServices.deletePost(post._id)
              setIsDeletePost('')
              getPosts()
            } catch (error) {
              console.log(error)
            }
          }

          // to display the comments
          const handleDisplayComment = (id) => {
            setIsComDisplay(!isComDisplay)
            setTargetPost(id)
          }

          // tu submit a comment
          const submitComment = async (e) => {
            e.preventDefault()
            if (e.target['comment'].value.trim() === '') {
              e.target['comment'].value = ''
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

          // to cancel an editing comment
          const handleEditCommentCancel = (e) => {
            e.preventDefault()
            document.getElementById('comment').value = ''
          }

          return (
            <li className="postCard" key={post._id}>
              {isLoading ? (
                <div className="isLoading"></div>
              ) : (
                <>
                  <div className="postCard__front">
                    {(!isEdited || targetPost !== post._id) && (
                      <>
                        <div className="postCard__front__header">
                          {post._image === 'null' ? (
                            <div className="postCard__front__header__postImage"></div>
                          ) : (
                            <div className="postCard__front__header__postImage">
                              <img
                                src={post._image}
                                alt="illustration of the post"
                              />
                            </div>
                          )}
                          <div className="postCard__front__header__data"></div>
                          <div className="postCard__front__header__user">
                            <div className="postCard__front__header__user__stamp">
                              <StampedSvg />
                              <Moment
                                format="DD/MM/YY"
                                className="postCard__front__header__user__stamp__date"
                              >
                                {post.createdAt}
                              </Moment>
                            </div>
                            <div className="postCard__front__header__user__picture">
                              <img
                                src={stamp}
                                className="postCard__front__header__user__picture__border"
                                alt="border of the author protrait"
                              />
                              <img
                                src={poster._profilePicture}
                                className="postCard__front__header__user__picture__image"
                                alt="portrait of the author of the post"
                              />
                            </div>
                            <div className="postCard__front__header__user__name">
                              {poster._firstName} {poster._lastName}
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
                          <div className="postCard__front__footer__date">
                            <Moment format="DD/MM/YYYY à HH:mm" className="">
                              {post.createdAt}
                            </Moment>
                          </div>
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
                                            firstName={commenterData._firstName}
                                            lastName={commenterData._lastName}
                                            defaultValue={comment.text}
                                            handleCancel={() =>
                                              setIsEditedComment(false)
                                            }
                                            handleSubmit={submitEditedComment}
                                            borderImage={stamp}
                                            altBorder="border of the author"
                                            profilPicture={
                                              commenterData._profilePicture
                                            }
                                            altPicture="portrait of the author of the comment"
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
                            altBorder="border of the author"
                            altPicture="portrait of the author of the comment"
                          />
                        </div>
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
                            <div className="postCard__front__header__data"></div>
                            <div className="postCard__front__header__user">
                              <div className="postCard__front__header__user__stamp">
                                <StampedSvg />
                                <Moment
                                  format="DD/MM/YY"
                                  className="postCard__front__header__user__stamp__date"
                                >
                                  {post.createdAt}
                                </Moment>
                              </div>
                              <div className="postCard__front__header__user__name">
                                {poster._firstName} {poster._lastName}
                              </div>
                              <div className="postCard__front__header__user__picture">
                                <img
                                  src={stamp}
                                  className="postCard__front__header__user__picture__border"
                                  alt="border of the author portrait"
                                />
                                <img
                                  src={poster._profilePicture}
                                  className="postCard__front__header__user__picture__image"
                                  alt="portrait of the author of the post"
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
                </>
              )}
            </li>
          )
        })}
    </>
  )
}
