import { CancelButton, ConfirmButton } from "../Atoms/buttons"

export default function ConfirmBox ({ name, handleCancel, handleCconfirm }) {

    return (
        <div className={name + "__confirmBox"}>
            <div className={name + "__confirmBox__title"}>
                {"Are you sure to " + name}
            </div>
            <div className={name + "__confirmBox__btn"}>
                    <CancelButton className={name + "__confirmBox__btn__cancel"} onClick={handleCancel}/>
                    <ConfirmButton className={name + "__confirmBox__btn__confirm"} onClick={handleCconfirm}/>
            </div>
        </div>
    )
}