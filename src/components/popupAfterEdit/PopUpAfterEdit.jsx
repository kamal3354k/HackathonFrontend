import React from 'react'
import "./style.css"

const PopUpAfterEdit= ({handleModalCancel,handleModalProceed}) => {
    return (
        <div className="customPopup">
            <div className="customPopupInner">
                <div className="customPopupHeader">
                    <h4>Edit proposal form</h4>
                </div>
                <div className="customPopupBody">
                    <p>The changes to the proposal form might impact your premium and the policy issue date. An agent will also be assigned to you to provide assistance. Are you sure you want to make these changes?</p>
                    
                    <div className="buttonControlBlock btnRow">
                        <button onClick={handleModalProceed}  className="btnOutline">Confirm</button>
                        <button onClick={handleModalCancel} className="btnFill">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopUpAfterEdit