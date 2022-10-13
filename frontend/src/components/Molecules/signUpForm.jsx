import { FormField } from "../Atoms/Form/formField";

export const SignUpForm = ({ className }) => {
    return (
        <>
            <div className={ className }>
                <FormField name="firstName" className="signupForm__field" type ="text">
                    Enter your firstname
                </FormField>
            </div>
            <div className={ className }>  
                <FormField name="lastName" className="signupForm__field" type ="text">
                    Enter your lastname
                </FormField>
            </div>
            <div className={ className }>
                <FormField name="email" className="signupForm__field" type ="email">
                    Enter an email adress
                </FormField>
            </div>
            <div className={ className }>
                <FormField name="password" className="signupForm__field" type ="password">
                    Choose a password
                </FormField>
            </div>
            <div className={ className }>            
                <FormField name="confirmPassword" className="signupForm__field" type ="password">
                    Confirm your password
                </FormField>
            </div>
        </>
    )
}

