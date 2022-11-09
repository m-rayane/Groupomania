// Libraries
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// CSS
import '../utils/style/auth.scss'
import { regexName, regexEmail, regexPassword } from '../utils/regex/regex'

// Components
import { SignInForm } from '../components/Organisms/signInForm'
import { SignUpForm } from '../components/Organisms/signUpForm'

// Services
import { PostContext } from '../utils/contexts/postContext'
import UserService from '../api/Services/UserServices'

const userServices = new UserService()

export default function Login() {
  const { usersData } = useContext(PostContext)
  const navigate = useNavigate()

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

    const isEmail = usersData.find((user) => user._email === emailValue)
    isEmail ? setError('Email already exist') : console.log('email ok')

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
      setError(
        'Password is not valid ! It expects minimum 8 characters, at least 1 lowercase letter, 1 uppercase letter, and 1 digit. Special characters ! @ # $ % ^ & * are also authorized.'
      )
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
      } catch (err) {
        console.error(err)
      } finally {
        if (
          !isEmail &&
          emailValue &&
          passwordValue &&
          passwordValue === confirmPasswordValue
        ) {
          const email = emailValue
          const password = passwordValue
          const userData = {
            email: email,
            password: password,
          }
          await userServices.logInUser(userData).then((response) => {
            localStorage.setItem('userId', response.data.userId)
            localStorage.setItem('isAdmin', response.data.isAdmin)
            localStorage.setItem(
              'expirationDate',
              response.data.tokenExpiration
            )
          })
          navigate('/', { replace: true })
        }
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
        localStorage.setItem('userId', response.data.userId)
        localStorage.setItem('isAdmin', response.data.isAdmin)
        localStorage.setItem('expirationDate', response.data.tokenExpiration)
      })

      navigate('/', { replace: true })
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
    setErrorBtn('')
  }

  const handleSignUpModal = async () => {
    setActiveSignInBtn('')
    setActiveSignUpBtn('activeBtn')
    setIsSignIn(false)
    setError('')
    setErrorBtn('')
  }

  const handleChange = async () => {
    setError('')
    setErrorBtn('')
  }

  return (
    <>
      <h1 className="login__message">
        Welcome to the
        <br />
        <span>POST OFFICE !</span>
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
            <div className="auth__content__message__error">{error}</div>
          </div>
        </div>
      </div>
    </>
  )
}
