import {
  HeartSvg,
  EditSvg,
  DeleteSvg,
  CommentSvg,
  CancelSvg,
  ConfirmSvg,
  SendSvg,
  TurnSvg,
} from './svg'

export const LikeButton = ({ className, onClick, value }) => {
  return (
    <button className={className} onClick={onClick} value={value}>
      <HeartSvg />
    </button>
  )
}

export const CommentButton = ({ className, onClick, value }) => {
  return (
    <button className={className} onClick={onClick} value={value}>
      <CommentSvg />
    </button>
  )
}

export const EditButton = ({ className, onClick, value }) => {
  return (
    <button className={className} onClick={onClick} value={value}>
      <EditSvg />
    </button>
  )
}

export const DeleteButton = ({ className, onClick, value }) => {
  return (
    <button className={className} onClick={onClick} value={value}>
      <DeleteSvg />
    </button>
  )
}

export const CancelButton = ({ className, onClick, value }) => {
  return (
    <button className={className} onClick={onClick} value={value}>
      <CancelSvg />
    </button>
  )
}

export const ConfirmButton = ({ className, onClick, value }) => {
  return (
    <button className={className} onClick={onClick} value={value}>
      <ConfirmSvg />
    </button>
  )
}

export const SendButton = ({ className, onClick, value }) => {
  return (
    <button className={className} onClick={onClick} value={value}>
      <SendSvg />
    </button>
  )
}

export const TurnButton = ({ className, onClick, value }) => {
  return (
    <button className={className} onClick={onClick} value={value}>
      <TurnSvg />
    </button>
  )
}
