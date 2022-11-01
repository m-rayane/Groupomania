import "../utils/style/profile.scss";

import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { PostContext } from "../utils/contexts/postContext";

import UserService from '../api/Services/UserServices';

import { ModifyButtons } from "../components/Molecules/modifyButtons";
import { ConfirmButtons } from "../components/Molecules/confirmButtons";
import { FormField } from "../components/Atoms/Form/formField";

import stamp from "../utils/images/stamp-rectangle-white.png";
const userServices = new UserService();

const regexName = /^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\s]*$/i;  
const regexEmail = /^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$/i;

export default function Profil() {
    const { userIdData, tokenLS, getUserId, getUsers, isLoading } = useContext(PostContext);

    const navigate = useNavigate();

    const [isEdited, setIsEdited] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null)
    const [error, setError] = useState('');

    useEffect(() => {
        if (!tokenLS) {
            navigate("/login", { replace: true });
        }
      });

    const handleEditUser =  () => {
        setIsEdited(true);
    };

    const handleDeleteUser =  () => {

    };

    const handleCancel = () => {
        setIsEdited(false);
    };

    const handleConfirm = async (e) => {
        e.preventDefault()
        setError('')
        const firstNameValue = e.target['newFirstName'].value;
        const lastNameValue = e.target['newLastName'].value;
        const emailValue = e.target['newEmail'].value;

        const firstNameTest = regexName.test(firstNameValue);
        const lastNameTest = regexName.test(lastNameValue);
        const emailTest = regexEmail.test(emailValue);

        if (firstNameTest === false || firstNameValue === '') {
          setError('First Name is not valid !')
        } else if (lastNameTest === false || lastNameValue === '') {
          setError('Last Name is not valid !')
        } else if (emailTest === false || emailValue === '') {
          setError('Email is not valid !')
        } else {
          try {
            const userData = new FormData()
            userData.append('firstName', firstNameValue)
            userData.append('lastName', lastNameValue);
            userData.append('email', emailValue);
            userData.append('image', profilePicture);
            userData.append('isAdmin', userIdData.isAdmin);
            userData.append('userId', userIdData._id);
            await userServices.editUser(userIdData._id, userData)
            // e.target['newFirstName'].value = ''
            // e.target['newLastName'].value = ''
            // e.target['newEmail'].value = ''
            window.location.reload(false);
            setIsEdited(false);
          } catch (err) {
            setError('An error occurs. Try again later')
          }
        }
    };

    const handleImage = (e) => {
        setProfilePicture(e.target.files[0]);        
    }
    
    const handleChange = async () => {
        setError('');
    }

    return (
        <>
            { !isEdited && (
                <div className="profile">
                    <div className="profile__header">
                        <div className="profile__header__picture">
                            <img src={stamp} className="profile__header__picture__border" alt="" />
                            <img src={userIdData.profilePicture} className="profile__header__picture__image" alt="" />
                        </div>
                        <div className="profile__header__infos">
                            <div className="profile__header__infos__name">{userIdData.firstName} {userIdData.lastName}</div>
                            <div className="profile__header__infos__email">{userIdData.email}</div>
                        </div>
                    </div>
                    <div className="profile__content">
                        <div className="profile__content__date"></div>
                        <div className="profile__content__modify">
                            <ModifyButtons className="profile__content__modify" editHandleClick={handleEditUser} deleteHandleClick={handleDeleteUser} />
                        </div>
                    </div>
                </div>
            )}
            { isEdited &&  (
                <form className="profile" onSubmit={handleConfirm}>
                    <div className="profile__header">
                        <div className="profile__header__picture">
                            <img src={stamp} className="profile__header__picture__border" alt="" />
                            <img src={userIdData.profilePicture} className="profile__header__picture__image" alt="" />
                            <FormField className="profile__header__picture__choice" type ="file" name="profilePicture" onChange={handleImage}></FormField>
                        </div>
                        <div className="profile__header__infos">
                            <FormField className="profile__header__form__firstName" name="newFirstName" type="text" defaultValue={userIdData.firstName} children="Firstname" onChange={handleChange}/>
                            <FormField className="profile__header__form__firstName" name="newLastName" type="text" defaultValue={userIdData.lastName} children="Lastname" onChange={handleChange}/>
                            <div className="profile__header__form__email">
                            <FormField className="profile__header__form__email" name="newEmail" type="email" defaultValue={userIdData.email} children="Email" onChange={handleChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="profile__content">
                        <div className="profile__content__date"></div>
                        <div className="profile__content__modify">
                            <ConfirmButtons className="profile__content__modify" cancelHandleClick={handleCancel} />
                        </div>
                    </div>
                </form>
            )}

        </>
    )
};