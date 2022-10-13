import { createContext, useState } from 'react'
export const FormContext = createContext()

export const AuthProvider = ({children}) => {
const [authModal, setAuthModal] = useState({
    signUpModal: false,
    signInModal: true
  })

  const toggleModals = (modal) => {
    if (modal === 'signIn') {
      setAuthModal({
        signUpModal: false,
        signInModal: true
      })
    }
    if (modal === 'signUp') {
      setAuthModal({
        signUpModal: true,
        signInModal: false
      })
    }
  }

  return (
    <FormContext.Provider value={{ authModal, toggleModals }}>
      {children}
    </FormContext.Provider>
  )
}
