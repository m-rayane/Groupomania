import { CancelButton, ConfirmButton } from '../Atoms/buttons'

export default function ConfirmBox({
  name,
  className,
  handleCancel,
  handleCconfirm,
}) {
  return (
    <div className={className + '__confirmBox'}>
      <div className={className + '__confirmBox__title'}>
        {'Are you sure to ' + name + ' ?'}
      </div>
      <div className={className + '__confirmBox__btn'}>
        <CancelButton
          className={className + '__confirmBox__btn__cancel'}
          onClick={handleCancel}
        />
        <ConfirmButton
          className={className + '__confirmBox__btn__confirm'}
          onClick={handleCconfirm}
        />
      </div>
    </div>
  )
}
