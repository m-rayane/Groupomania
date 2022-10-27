import { FormField } from "../Atoms/Form/formField";

export const SignUpForm = ({ className, handleSubmit, handleChange }) => {
    return (
         <form onSubmit={handleSubmit} className={ className}>
            <div className={ className + "__fields"}>
                <FormField name="firstName" className={ className + "__fields__field"} type ="text" onChange={handleChange}>
                    Enter your firstname.
                </FormField>              
                <FormField name="lastName" className={ className + "__fields__field"} type ="text" onChange={handleChange}>
                    Enter your lastname.
                </FormField>            
                <FormField name="signUpEmail" className={ className + "__fields__field"} type ="email" onChange={handleChange}>
                    Enter an email address.
                </FormField>
                <FormField name="signUpPassword" className={ className + "__fields__field"} type ="password" onChange={handleChange}>
                    Choose a password.
                </FormField>                        
                <FormField name="confirmPassword" className={ className + "__fields__field"} type ="password" onChange={handleChange}>
                    Confirm your password.
                </FormField>  
            </div>
            <button className={ className + "__btn" }>Create</button>
          </form>         
    )
}

