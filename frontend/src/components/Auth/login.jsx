// atoms
import { SignInForm } from '../Molecules/signInForm'

// libraries
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { PostContext } from '../../utils/contexts/postContext'
import { FormContext } from '../../utils/contexts/formContext'
// css
import './auth.scss'

// api
import UserService from '../../api/Services/UserServices'
const userServices = new UserService()

export default function Login() {
  const { toggleModals, authModal } = useContext(FormContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const { getUser } = userServices()

  //sign in form submit
  const handleFormSubmit = async (e) => {
      e.preventDefault()
      const emailValue = e.target['email'].value;
      const passwordValue = e.target['password'].value;    
      try {
        const userData = {
          email: emailValue,
          password: passwordValue,
        }
        await userServices.logInUser(userData)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("id", response.data.userId);
          localStorage.setItem("isAdmin", response.data.isAdmin);
          console.log(response.data.isAdmin)
          console.log({...localStorage});
 
        });

        navigate('/', { replace: true });
        window.location.reload()
      } catch (err) {
        setError('Incorrect email or password. If you have forgotten your credentials, please contact your administrator.')
      }
    }

  // rendering DOM
  return (
    <>
      {authModal.signInModal && (
        <section className="auth">

          <div className="auth__modal">
            <button onClick={() => toggleModals('signUp')} className="auth__modal__btn"> 
            
              Sign-Up
            </button>
            <h1 className="auth__modal__title">Sign-In</h1>
          </div>

          <div className="auth__box">
              <h2 className="auth__box__title">Connect yourself !</h2>
              <form onSubmit={handleFormSubmit} className="auth__box__form">
                  <div>
                      <SignInForm className="auth__box__form__signin"></SignInForm>
                  </div>
                  <p className="auth__box__error">{error}</p>                
                  <button className="auth__box__form__submit">Connect</button>
              </form>
          </div>
        </section>
      )
    }
    </>
  )
}
