import { DeleteButton } from '../Atoms/buttons'
import { EditButton } from '../Atoms/buttons'

export const ModifyButtons = ({
  className,
  editHandleClick,
  deleteHandleClick,
  editValue,
  deleteValue,
}) => {
  return (
    <>
      <EditButton
        className={className + '__edit'}
        onClick={editHandleClick}
        value={editValue}
      />
      <DeleteButton
        className={className + '__delete'}
        onClick={deleteHandleClick}
        value={deleteValue}
      />
    </>
  )
}
