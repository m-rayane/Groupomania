import { CancelButton } from '../Atoms/buttons'
import { SendButton } from '../Atoms/buttons'

export const PostButtons = ({
  className,
  cancelHandleClick,
  confirmHandleClick,
  editValue,
  deleteValue,
}) => {
  return (
    <>
      <CancelButton
        className={className + '__cancel'}
        onClick={cancelHandleClick}
        value={editValue}
      />
      <SendButton
        className={className + '__send'}
        onClick={confirmHandleClick}
        value={deleteValue}
      />
    </>
  )
}
