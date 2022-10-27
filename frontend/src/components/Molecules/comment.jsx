export default function Comment ({className, comment, firstName, lastName, profilPicture, altPicture, onSubmit, onClick}) {

    return (
        <>
            <div className={className}>
                <div className={className + "__commenter"}>
                    <img src={profilPicture} alt={altPicture}/>
                    <div className={className + "__commenter__name"}>
                        {firstName + ' ' + lastName}
                    </div>
                </div>
                <div className={className + "__text"}>
                    {comment}
                </div>

            </div>

        </>
    )
}
