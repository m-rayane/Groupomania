// atoms
import { SignInForm } from '../components/Molecules/signInForm'
import { SignUpForm } from '../components/Molecules/signUpForm'

import '../utils/style/auth.scss'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import UserService from '../api/Services/UserServices'
const userServices = new UserService()

const regexName =
  /^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\s]*$/i
const regexEmail = /^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$/i
const regexPassword =
  /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\s]*$/i

export default function Login() {
  const navigate = useNavigate()

  const [validation, setValidation] = useState('')
  const [error, setError] = useState('')
  const [isSignIn, setIsSignIn] = useState(true)
  const [activeSignInBtn, setActiveSignInBtn] = useState('activeBtn')
  const [activeSignUpBtn, setActiveSignUpBtn] = useState('')
  const [errorBtn, setErrorBtn] = useState('')

  //Signup const and functions
  const handleSignUpSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const firstNameValue = e.target['firstName'].value
    const lastNameValue = e.target['lastName'].value
    const emailValue = e.target['signUpEmail'].value
    const passwordValue = e.target['signUpPassword'].value
    const confirmPasswordValue = e.target['confirmPassword'].value

    const firstNameTest = regexName.test(firstNameValue)
    const lastNameTest = regexName.test(lastNameValue)
    const emailTest = regexEmail.test(emailValue)
    const passwordTest = regexPassword.test(passwordValue)
    if (firstNameTest === false || firstNameValue.trim() === '') {
      setError('First Name is not valid !')
      setErrorBtn('errorBtn')
    } else if (lastNameTest === false || lastNameValue.trim() === '') {
      setError('Last Name is not valid !')
      setErrorBtn('errorBtn')
    } else if (emailTest === false || emailValue.trim() === '') {
      setError('Email is not valid !')
      setErrorBtn('errorBtn')
    } else if (passwordTest === false || passwordValue.trim() === '') {
      setError('Password is not valid !')
      setErrorBtn('errorBtn')
    } else if (passwordValue !== confirmPasswordValue) {
      setError('Passwords do not match')
      setErrorBtn('errorBtn')
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
        e.target['signUpEmail'].value = ''
        e.target['signUpPassword'].value = ''
        e.target['confirmPassword'].value = ''
        setValidation('Account successfully created')
      } catch (err) {
        setError('An error occurs. Try again later')
      }
    }
  }

  //Login consts and functions

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    const emailValue = e.target['signInEmail'].value
    const passwordValue = e.target['signInPassword'].value
    try {
      const userData = {
        email: emailValue,
        password: passwordValue,
      }
      await userServices.logInUser(userData).then((response) => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('id', response.data.userId)
        localStorage.setItem('isAdmin', response.data.isAdmin)
        console.log(response.data.isAdmin)
        console.log({ ...localStorage })
      })
      navigate('/', { replace: true })
      window.location.reload()
    } catch (err) {
      setErrorBtn('errorBtn')
      setError(
        'Incorrect email or password. If you have forgotten your credentials, please contact your administrator.'
      )
    }
  }

  // const activeBtn = (elementId) => {
  //   if (document.querySelector('.activeBtn')) {
  //     document.querySelector('.activeBtn').classList.remove('activeBtn')
  //   };
  //   document.getElementById(elementId).classList.add('activeBtn');
  // }

  const handleSignInModal = async () => {
    setActiveSignInBtn('activeBtn')
    setActiveSignUpBtn('')
    setIsSignIn(true)
    setError('')
    setValidation('')
    setErrorBtn('')
  }

  const handleSignUpModal = async () => {
    setActiveSignInBtn('')
    setActiveSignUpBtn('activeBtn')
    setIsSignIn(false)
    setError('')
    setValidation('')
    setErrorBtn('')
  }

  const handleChange = async () => {
    setError('')
    setValidation('')
    setErrorBtn('')
  }

  return (
    <>
      <h1 className="login__message">
        Welcome to our
        <br />
        <span>Company</span>
        <br />
        POST OFFICE !
      </h1>
      <div className="auth">
        <div className="auth__header">
          <button
            className={'auth__header__btn ' + activeSignInBtn}
            id="signInBtn"
            onClick={handleSignInModal}
          >
            SIGN-IN
          </button>
          <button
            className={'auth__header__btn ' + activeSignUpBtn}
            id="signUpBtn"
            onClick={handleSignUpModal}
          >
            CREATE YOUR ACCOUNT
          </button>
        </div>

        <div className="auth__content">
          {isSignIn && (
            <div className="auth__content__login">
              <SignInForm
                className="auth__content__login__form"
                handleSubmit={handleLoginSubmit}
                handleChange={handleChange}
                errorBtn={errorBtn}
              />
            </div>
          )}

          {!isSignIn && (
            <div className="auth__content__signUp">
              <SignUpForm
                className="auth__content__signUp__form"
                handleSubmit={handleSignUpSubmit}
                handleChange={handleChange}
                errorBtn={errorBtn}
              />
            </div>
          )}

          <div className="auth__content__message">
            {{ error } && (
              <div className="auth__content__message__error">{error}</div>
            )}
            {{ validation } && (
              <div className="auth__content__message__validation">
                {validation}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
