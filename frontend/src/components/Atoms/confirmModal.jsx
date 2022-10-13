import { useNavigate } from 'react-router-dom';

export const ConfirmModal = ({className, children, confirmFunction}) => {
  const navigate = useNavigate();
  return (
    <div className={'modal ' + className}>
      <h2 className={className + '__title'}>Are you sure to {children} ?</h2>
      <div className={className + '__choice'}>
          <button className={className +'__choice__cancel'} onClick={() => navigate(-1)}>Cancel</button>
          <button className={className +'__choice__confirm'} onClick={confirmFunction}>{children}</button>
      </div>
    </div>
  )
}
