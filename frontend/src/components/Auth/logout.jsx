
import React from "react";

import ConfirmBox from '../Molecules/confirmBox';

export default function Logout({ name, isConfirm, onClick, handleCancel, handleConfirm}) {


        return (
            <div className={name}>
                <button className={name + "__btn"}  onClick={onClick}>
                    Logout
                </button>
                { isConfirm && (
                <ConfirmBox name={name} handleCancel={handleCancel} handleCconfirm={handleConfirm} />
                )}
            </div>
        )

}
