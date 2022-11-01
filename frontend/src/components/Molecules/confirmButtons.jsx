import { CancelButton } from "../Atoms/buttons";
import { ConfirmButton } from "../Atoms/buttons";

export const ConfirmButtons = ({className, cancelHandleClick, confirmHandleClick, editValue, deleteValue }) => {
    return (
        <>
            <CancelButton className={className + "__cancel"} onClick={cancelHandleClick} value={editValue}/>
            <ConfirmButton className={className + "__confirm"} onClick={confirmHandleClick} value={deleteValue}/>
        </>
    )
}