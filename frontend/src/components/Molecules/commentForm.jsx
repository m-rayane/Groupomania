import { TextField } from '../Atoms/Form/formField'
import { CancelButton, SendButton } from '../Atoms/buttons'

export default function CommentForm({
  className,
  handleSubmit,
  handleCancel,
  borderImage,
  altBorder,
  profilPicture,
  altPicture,
  firstName,
  lastName,
  defaultValue,
}) {
  return (
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
      <form className={className + '__form'} onSubmit={handleSubmit}>
        <div className={className + '__form__textField'}>
          <TextField
            name="comment"
            wrap="hard"
            placeHolder="Comment..."
            defaultValue={defaultValue}
          ></TextField>
        </div>
        <div className={className + '__form__btn'}>
          <CancelButton
            className={className + '__form__btn__cancel'}
            onClick={handleCancel}
          />
          <SendButton className={className + '__form__btn__send'} />
        </div>
      </form>
    </div>
  )
}
