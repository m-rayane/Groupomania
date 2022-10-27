
import { SignUpForm } from '../Molecules/signUpForm'


import { useContext, useState } from 'react'

import { FormContext } from '../../utils/contexts/formContext'

import './auth.scss'


import UserService from '../../api/Services/UserServices'
const userServices = new UserService()



const regexName = /^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\s]*$/i;
  
const regexEmail = /^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$/i;

const regexPassword = /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\s]*$/i;

export default function SignUp() {
  const { toggleModals, authModal } = useContext(FormContext);
  const [error, setError] = useState('')
  const [validation, setValidation] = useState('')

   const handleSignupSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const firstNameValue = e.target['firstName'].value;
    const lastNameValue = e.target['lastName'].value;
    const emailValue = e.target['email'].value;
    const passwordValue = e.target['password'].value;
    const confirmPasswordValue = e.target['confirmPassword'].value;

    const firstNameTest = regexName.test(firstNameValue);
    const lastNameTest = regexName.test(lastNameValue);
    const emailTest = regexEmail.test(emailValue);
    const passwordTest = regexPassword.test(passwordValue);
    if (firstNameTest === false || firstNameValue === '') {
      setError('First Name is not valid !')
    } else if (lastNameTest === false || lastNameValue === '') {
      setError('Last Name is not valid !')
    } else if (emailTest === false || emailValue === '') {
      setError('Email is not valid !')
    } else if (passwordTest === false || passwordValue === '') {
      setError('Password is not valid !')
    } else if (
      passwordValue !== confirmPasswordValue
    ) {
      setError('Passwords do not match')
    } else {
      try {
        const userData = {
          firstName: firstNameValue,
          lastName: lastNameValue,
          email: emailValue,
          password: passwordValue,
        }
        await userServices.createUser(userData)
        e.target['firstName'].value = ''
        e.target['lastName'].value = ''
        e.target['email'].value = ''
        e.target['password'].value = ''
        e.target['confirmPassword'].value = ''
        setValidation('Account successfully created')
      } catch (err) {
        setError('An error occurs. Try again later')
      }
    }
  }

    return (
      <>
          <section className="auth">

            <div className="auth__modal">
              <button onClick={() => toggleModals('signIn')} className="auth__modal__btn"> 
              
                Sign-In
              </button>
              <h1 className="auth__modal__title">Sign-Up</h1>
            </div>

            <div className="auth__box">
                <h2 className="auth__box__title">Create your account !</h2>
                <form onSubmit={handleSignupSubmit} className="auth__box__form">
                    <div>
                        <SignUpForm className="auth__box__form__signup"></SignUpForm>
                    </div>
                    <p className="auth__box__valid">{validation}</p>
                    <p className="auth__box__error">{error}</p>                
                    <button className="auth__box__form__submit">Register</button>
                </form>
            </div>
          </section>
      </>
    )
}
