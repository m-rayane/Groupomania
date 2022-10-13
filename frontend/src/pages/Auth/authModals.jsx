// import { UidContext } from '../../context/userIdContext'
// import { useContext } from 'react'
// import { useNavigate } from 'react-router-dom'

// //  import style
// import '../../utils/styles/Authentication.css'

// import components
import SignUp from '../../components/Auth/signup'
import Login from '../../components/Auth/login'


export default function AuthModals() {
//   const uid = useContext(UidContext)
//   const navigate = useNavigate()

//   if (uid) {
//     navigate('/home', { replace: true })
//   }

  return (
    <main className="authModals">
      <SignUp />
      <Login />
    </main>
  )
}