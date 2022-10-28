import { FormField } from "../Atoms/Form/formField";

export const SignInForm = ({ className, handleSubmit, handleChange }) => {
    return (
            <form onSubmit={handleSubmit} className={ className}>
                <div className={ className + "__fields" }>
                    <FormField name="signInEmail" className={ className + "__fields__field"} type ="email" onChange={handleChange}>
                        Email
                    </FormField>            
                    <FormField name="signInPassword" className={ className + "__fields__field"} type ="password" onChange={handleChange}>
                        Password
                    </FormField> 
                </div>
                <button className={ className + "__btn" }>CONNECT</button>
          </form>         
    )
}
