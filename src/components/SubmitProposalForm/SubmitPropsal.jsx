import React, { useState, useEffect } from 'react'
import CrossIcon from "../../assets/icons/crossIcon_svg.svg"
import TimerImage from "../../assets/utils/timer_svg.svg"
import BajajImage from "../../assets/utils/bajajImage.png"
import { Link } from 'react-router-dom';
import axios from "axios";

import "./style.css"
import SkeletonLoader from '../skeletonLoader/SkeletonLoader';

export const SubmitProposal = ({ setSubmitForm, submitForm }) => {
    const [stage, setStage] = useState(1);
    const [Consent, setConsent] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error,setError]=useState(false);
    const handleClose = () => {
        setSubmitForm(false);
    }

    // useEffect(() => {
    //     if (stage == 2) {
    //         const timer = setTimeout(() => {
    //             handleClose();
    //         }, 2000);
    //         return () => clearTimeout(timer);
    //     }

    // }, [stage]);

    const onsubmit = (consent) => {
        if(!consent){
            setError(true);
            return;
        }else{
            setError(false);
        }
        setLoading(true);
        setStage(2);
        axios.post('https://hackathonbackend-psi.vercel.app/api/setCustConsent', {
            "IsConsent": consent,
            "LeadID": 111,
            "CustomerID": 12345
        })
            .then((response) => {
                setLoading(false);
                setStage(3);
            })
            .catch((err) => {
                setLoading(false);
                setStage(1);
            });

        return () => {
        };

    }
    return (
        <div className="customPopup">
            <div className="customPopupInner">
                {stage==1?
                 <div>
                    <div className="customPopupHeader">
                        <h4>Submit proposal form</h4>
                        <img src="https://static.pbcdn.in/myaccount-cdn/images/login-close-icon.svg" alt="" onClick={handleClose} />
                    </div>
                    <div className="customPopupBody">
                        {/* <div className="successBlock">
                   <img src="https://icons.veryicon.com/png/o/miscellaneous/8atour/success-35.png" alt=""/>
                  <h3>Successfull !!!!!!!</h3>
               </div> */}
                        {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat praesentium doloribus saepe laborum molestias sapiente nisi, exercitationem nostrum nam provident.</p> */}
                        <div className="confirmationBlock">
                            <input type="checkbox" name="" id="confirm" onChange={(e) => setConsent(e.target.checked)} />
                            <label for="confirm">I have checked that all the details are correct.</label>
                        </div>
                       {error && <span>errorms </span>} 
                        <div className="buttonControlBlock btnRow">
                            {/* <button className="btnOutline">Submit</button> */}
                            <button className="btnFill" onClick={() => onsubmit(Consent)}>Submit</button>
                        </div>
                    </div>
                </div> :
                    loading && stage==2? <SkeletonLoader count={3}/> :
                        stage === 3 ?
                        <div>
                            <div className="customPopupHeader">
                        <h4>Submit proposal form</h4>
                        <img src="https://static.pbcdn.in/myaccount-cdn/images/assets/success-image.png" alt="" onClick={handleClose} />
                        <div className="customPopupBody">
                            <div className="successBlock">
                                <img src="https://icons.veryicon.com/png/o/miscellaneous/8atour/success-35.png" alt="" />
                                <h3>Successfull !!!!!!!</h3>
                            </div>
                    </div>
                            </div>
                            {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat praesentium doloribus saepe laborum molestias sapiente nisi, exercitationem nostrum nam provident.</p> */}
                        </div> : ''
}
            </div>
        </div>
    )
}