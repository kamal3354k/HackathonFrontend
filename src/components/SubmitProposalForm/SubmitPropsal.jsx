import React, { useState, useEffect } from 'react'
import axios from "axios";

import "./style.css"
import SkeletonLoader from '../skeletonLoader/SkeletonLoader';

export const SubmitProposal = ({ setSubmitForm, submitForm }) => {
    const [stage, setStage] = useState(1);
    const [Consent, setConsent] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const handleClose = () => {
        setSubmitForm(false);
    }

    const onsubmit = (consent) => {
        if (!consent) {
            setError(true);
            return;
        } else {
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
                {stage == 1 ?
                    <div>
                        <div className="customPopupHeader">
                            <h4>Submit application</h4>
                            <img src="https://static.pbcdn.in/myaccount-cdn/images/login-close-icon.svg" alt="" onClick={handleClose} />
                        </div>
                        <div className="customPopupBody">
                            <p>Details will be shared with Bajaj Allianz for issuing your policy copy</p>
                            <div className="confirmationBlock">
                                <input type="checkbox" name="" id="confirm" onChange={(e) => setConsent(e.target.checked)} />
                                <label for="confirm">I have reviewed my details and are correct to best of my knowledge</label>
                            </div>
                            {error && <p className="error-text">Required</p>}
                            <div className="buttonControlBlock btnRow">
                                <button className="btnFill" onClick={() => onsubmit(Consent)}>Submit</button>
                            </div>
                        </div>
                    </div>
                    :
                    loading && stage == 2 ? <SkeletonLoader count={3} /> :
                        stage === 3 ?
                            <div>
                                <div className="customPopupHeader">
                                <h4></h4>
                                    <img src="https://static.pbcdn.in/myaccount-cdn/images/login-close-icon.svg" alt="" onClick={handleClose} />
                                    <div className="customPopupBody">
                                        <div className="successBlock">
                                            <img src="https://static.pbcdn.in/myaccount-cdn/images/assets/success-image.png" alt="" />
                                            <h3>Your application has been submitted to Bajaj Allianz</h3>
                                        </div>
                                    </div>
                                </div>
                            </div> : ''
                }
            </div>
        </div>
    )
}