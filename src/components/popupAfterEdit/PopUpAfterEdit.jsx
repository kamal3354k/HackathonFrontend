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
                    <div className="successBlock">
                        <img src="https://icons.veryicon.com/png/o/miscellaneous/8atour/success-35.png" alt="" />
                    </div>
                    <p>Making changes in proposal details might impact your premium amount. Are you sure you want yo make the changes?</p>
                    
                    <div className="buttonControlBlock btnRow">
                        <button onClick={handleModalProceed}  className="btnOutline">Proceed to changes</button>
                        <button onClick={handleModalCancel} className="btnFill">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopUpAfterEdit