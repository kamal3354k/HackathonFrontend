import React, { useState } from 'react'
import CrossIcon from "../../assets/icons/crossIcon_svg.svg"
import TimerImage from "../../assets/utils/timer_svg.svg"
import BajajImage from "../../assets/utils/bajajImage.png"
import { Link } from 'react-router-dom';

import "./style.css"

const Modal = (props) => {
    const { label, value } = props
    const [isOpen, setIsOpen] = useState("dBlock")

    const handleClose = () => {
        setIsOpen("dNone")
    }

    return (
        <div id="myModal" class={`modal ${isOpen}`}>

            <div class="modal-content">
                <span class="close" onClick={handleClose}><img src={CrossIcon} alt="close" /></span>
                <div className="modal-header">Review your proposal form</div>
                <div className="modal-body">
                    <div className="time-image-container">
                        <img src={TimerImage} alt="timer" />
                        <span className="time-countdown">20</span>
                    </div>
                    <p className='content'>Check your proposal details and make changes something is incorrect before submitting to insurer</p>
                    {label && value && <div className="content-item">
                        <h3>Smart Protect Goal Life Cover plus</h3>
                        <div className="container">

                            <span className="image-container">
                                <div className="inner-container">
                                    <img src={BajajImage} alt="bajaj image" />
                                </div>
                            </span>
                            <div className="container-content">
                                <div className="conatiner-item">
                                    <h4>Proposar</h4>
                                    <h3>{label}</h3>
                                </div>
                                <div className="conatiner-item">
                                    <h4>Proposar Number</h4>
                                    <h3>{value}</h3>
                                </div>
                            </div>
                        </div>
                    </div>}

                    <Link to="detail-page" className="proposal-btn">Review proposal form</Link>
                </div>
            </div>

        </div>
    )
}

export default Modal