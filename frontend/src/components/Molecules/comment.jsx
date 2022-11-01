export default function Comment({
  className,
  comment,
  firstName,
  lastName,
  borderImage,
  altBorder,
  profilPicture,
  altPicture,
  onSubmit,
  onClick,
}) {
  return (
    <>
      <div className={className}>
        <div className={className + '__commenter'}>
          <div className={className + '__commenter__picture'}>
            <img
              className={className + '__commenter__picture__border'}
              src={borderImage}
              alt={altBorder}
            />
            <img
              className={className + '__commenter__picture__image'}
              src={profilPicture}
              alt={altPicture}
            />
          </div>
          <div className={className + '__commenter__name'}>
            {firstName + ' ' + lastName}
          </div>
        </div>
        <div className={className + '__text'}>{comment}</div>
      </div>
    </>
  )
}
