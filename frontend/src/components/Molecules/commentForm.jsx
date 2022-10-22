import { TextField } from "../Atoms/Form/formField";

export default function CommentForm ({className, onSubmit, onClick}) {

    return (
        <>
            <form className={className} onSubmit={onSubmit}>
                <div>
                    <TextField className={className + "__TextField"} name="comment" wrap="hard" placeHolder="Comment..."></TextField>
                </div>
                <div>
                    <button className={className + "__TextField__btn"} onClick={onClick}>Cancel</button>
                    <button className={className + "__TextField__btn"}>Comment</button>
                </div>
            </form>

        </>
    )
}
