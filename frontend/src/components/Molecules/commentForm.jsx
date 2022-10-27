import { TextField } from "../Atoms/Form/formField";

export default function CommentForm ({className, handleSubmit, handleCancel, profilPicture, altPicture, firstName, lastName, defaultValue}) {

    return (
            <div className={className}>
                <div className={className + "__commenter"}>
                    <img src={profilPicture} alt={altPicture}/>
                    <div className={className + "__commenter__name"}>
                        {firstName + ' ' + lastName}
                    </div>
                </div>
                <form className={className} onSubmit={handleSubmit}>
                    <div>
                        <TextField className={className + "__TextField"} name="comment" wrap="hard" placeHolder="Comment..." defaultValue={defaultValue}></TextField>
                    </div>
                    <div>
                        <button className={className + "__TextField__btn"} onClick={handleCancel}>Cancel</button>
                        <button className={className + "__TextField__btn"}>Comment</button>
                    </div>
                </form>
            </div>
    )
}
