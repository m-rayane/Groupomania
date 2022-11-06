import React from 'react'

import ConfirmBox from '../Molecules/confirmBox'

import { LogoutSvg } from '../Atoms/svg'

export default function Logout({
  className,
  name,
  isConfirm,
  onClick,
  handleCancel,
  handleConfirm,
}) {
  return (
    <div className={className}>
      <button className={className + '__btn'} onClick={onClick}>
        <LogoutSvg />
      </button>
      {isConfirm && (
        <ConfirmBox
          name={name}
          className={className}
          handleCancel={handleCancel}
          handleCconfirm={handleConfirm}
        />
      )}
    </div>
  )
}
