import '../utils/style/postOffice.scss';
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {FormField, TextField} from  "../components/Atoms/Form/formField";
import FormData from "form-data";
import PostServices from '../api/Services/PostServices';

import { PostContext } from "../utils/contexts/postContext";




export default function CreatePost() {
    const { userIdData, tokenLS, getPosts} = useContext(PostContext);
    const postServices = new PostServices();
    const navigate = useNavigate();
    const [postImage, setPostImage] = useState(null);

    useEffect(() => {
        if (!tokenLS) {
            navigate('/auth', { replace: true });
        }
      });

    async function HandleSubmit(e) {
        e.preventDefault()
    
        const formData = new FormData()
        formData.append('posterId', userIdData._id)
        formData.append('message', e.target['postMessage'].value);
        formData.append('image', postImage);
        console.log(...formData);
        console.log(e.target['postMessage'].value);


        try {
            await postServices.postPost(formData);
            e.target['postMessage'].value = '';
            setPostImage(null);
            getPosts()
        } catch (error) {
            console.log(error)
        }
      }

      const handleImage = (e) => {
        setPostImage(e.target.files[0]);        
      }

      const imagePreview = () => {
        const [file] = imagePreview.files
        if(file) {
            const preview = document.getElementById('preview')
            preview.src = URL.createObjectURL(file)
            console.log(preview.src)
        }
      }

      return (
        <div>
            <form className="postForm__front" onSubmit={HandleSubmit}>
                <div className="postForm__front__header">
                    <div className="postForm__front__header__postImage">
                        <img id="preview" src="" alt="" />
                    </div>
                    <div className="postForm__front__header__postImage">
                            <FormField className="postForm__image" type ="file" name="postImage" onChange={handleImage}></FormField>
                    </div>
                    <div className="postForm__front__header__user">
                        <div className="postForm__front__header__user__name">
                            {/* Send by {poster.firstName} {poster.lastName} */}
                        </div>
                        <div className="postForm__front__header__user__picture">
                            {/* <img src={poster.profilePicture} alt="" /> */}
                        </div>
                    </div>
                </div>
                <div className="postForm__front__content">
                    <TextField className="postForm__front__content__message" name="postMessage" wrap="hard" placeHolder="Tale us your Story..."></TextField>
                </div>
                <div className="postForm__front__footer">
                    <div>
                        <button className="postForm__front__footer__btn">Cancel</button>
                        <button className="postForm__front__footer__btn">Post</button>
                    </div>
                </div>
            </form>
            
        </div>
     );
}



