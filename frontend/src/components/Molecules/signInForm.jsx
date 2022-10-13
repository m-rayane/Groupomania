import { FormField } from "../Atoms/Form/formField";

export const SignInForm = ({ className }) => {
    return (
        <>
            <div className={ className }>
                <FormField name="email" className="signupForm__field" type ="email">
                    Enter your email address !
                </FormField>
            </div>
            <div className={ className }>
                <FormField name="password" className="signupForm__field" type ="password">
                    Enter your password !
                </FormField>
            </div>
        </>
    )
}
