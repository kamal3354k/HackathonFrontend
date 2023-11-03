import React, { useState,useEffect } from 'react'
import CrossIcon from "../../assets/icons/crossIcon_svg.svg"
import TimerImage from "../../assets/utils/timer_svg.svg"
import BajajImage from "../../assets/utils/bajajImage.png"
import { Link } from 'react-router-dom';
import axios from "axios";

import "./style.css"

export const SubmitProposal = ({setSubmitForm,submitForm}) => {
    const [stage,setStage]=useState(1);
    const [Consent,setConsent]=useState(false);
    const handleClose = () => {
        setSubmitForm(false);
    }

    useEffect(() => {
        if (stage == 2) {
            const timer = setTimeout(() => {
                handleClose();
            }, 2000);
            return () => clearTimeout(timer);
        }

    }, [stage]);

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
      };

    const onsubmit=(consent)=>{
        axios.post('https://hackathonbackend-psi.vercel.app/api/setCustConsent', {
                "IsConsent" : consent,
                "LeadID" : 111,
                "CustomerID" : 12345
          })
            .then((response) => {
             setStage(2);
            })
            .catch((err) => {
              
            });
      
          return () => {
          };
    }


    return (
        <div className="customPopup">
        <div className="customPopupInner">
            {stage==1?<div>
            <div className="customPopupHeader">
                <h4>Submit proposal form</h4>
                <img src="https://static.pbcdn.in/myaccount-cdn/images/login-close-icon.svg" alt="" onClick={handleClose}/>
            </div>
            <div className="customPopupBody">
               {/* <div className="successBlock">
                   <img src="https://icons.veryicon.com/png/o/miscellaneous/8atour/success-35.png" alt=""/>
                  <h3>Successfull !!!!!!!</h3>
               </div> */}
                {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat praesentium doloribus saepe laborum molestias sapiente nisi, exercitationem nostrum nam provident.</p> */}
                <div className="confirmationBlock">
                    <input type="checkbox" name="" id="confirm" onChange={(e)=>setConsent(e.target.checked)} />
                <label for="confirm">I have checked that all the details are correct.</label>    
                </div>
                <div className="buttonControlBlock btnRow">
                       {/* <button className="btnOutline">Submit</button> */}
                    <button className="btnFill" onClick={()=>onsubmit(Consent)}>Submit</button>
                </div>
            </div>
            </div>:
            <div className="customPopupBody">
            <div className="successBlock">
                <img src="https://icons.veryicon.com/png/o/miscellaneous/8atour/success-35.png" alt=""/>
               <h3>Successfull !!!!!!!</h3>
            </div>
             {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat praesentium doloribus saepe laborum molestias sapiente nisi, exercitationem nostrum nam provident.</p> */}
         </div>}
            
        </div>
    </div>
    )
}