import './postOffice.scss';
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {FormField, TextField} from  "../Atoms/Form/formField";
import FormData from "form-data";
import PostServices from '../../api/Services/PostServices';

import { PostContext } from "../../utils/contexts/postContext";




export default function CreatePost() {
    const { userIdData, tokenLS} = useContext(PostContext);
    const postServices = new PostServices();
    const navigate = useNavigate();
    const [postImage, setPostImage] = useState(null);

    console.log(tokenLS);
    console.log(userIdData);
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
        // console.log(...formData);
        // console.log(e.target['postMessage'].value);


        try {
            await postServices.postPost(formData);
            // e.target['message'].value = '';
            // setFile(null);
        } catch (error) {
            console.log(error)
        }
      }

      const handleImage = (e) => {
        setPostImage(e.target.files[0]);

      }

      return (
        <div>
            <form className="postForm" onSubmit={HandleSubmit}>
                {/* <div className="postUsername">{setUsername(username)}</div> */}
                <TextField className="postForm__field" name="postMessage" maxLength="500" wrap="hard" >Content</TextField>
                <FormField className="postForm__image" type ="file" name="postImage" onChange={handleImage}></FormField>
                
                <div>
                    <button className="signupForm__btn">Envoyer</button>
                </div>
            </form>
            
        </div>
     );
}



