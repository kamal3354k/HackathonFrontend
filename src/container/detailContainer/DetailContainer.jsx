import React, { useCallback, useEffect, useState } from 'react'
import DetailComponent from '../../components/DetailComponent/DetailComponent'
import "./style.css"
import { useUserContext } from '../../provider/userProvider';
import PopUpAfterEdit from '../../components/popupAfterEdit/PopUpAfterEdit';
import { SubmitProposal } from '../../components/SubmitProposalForm/SubmitPropsal';
import SkeletonLoader from '../../components/skeletonLoader/SkeletonLoader';
import axios from 'axios';

let holdARR = [];
const DetailContainer = ({ setshowSkeleton }) => {

  const [state, setState] = useState([]);
  const [submitForm, setSubmitForm] = useState(false);
  const [showCheckBox, setShowCheckbox] = useState(false)
  const [showEditPopUp, setShowEditPopUp] = useState(false);

  // flowType=1 // All Details OK push to insurer
  // flowType=2 // Edit and redirect to CJ

  const [flowType, setFlowType] = useState(1);

  const {
    user, setStates
  } = useUserContext();

  const [showSkeletonForm, setShowSkeletonForm] = useState(true)



  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeletonForm(false)
    }, 2000)
    return () => clearTimeout(timer);
  }, [user.edit])

  const handleCheckBoxFormState = ({ target: { value } }) => {
  let val = Number(value);

  // Use the updater function to update the state based on the previous state
  setState(prevState => {
    if (!prevState.includes(val)) {
      // If val is not in the array, add it
      return [...prevState, val];
    } else {
      // If val is in the array, remove it
      return prevState.filter(item => item !== val);
    }
  });
};


  const handleEdit = () => {
    setShowEditPopUp(true);
    setFlowType(2)
  }

  const handleModalCancel = () => {
    setShowEditPopUp(false)
    setShowCheckbox(false)
    setStates((pre) => ({ ...pre, edit: false }))
    setshowSkeleton(true)


  }

  const handleModalProceed = () => {
    setshowSkeleton(true)

    setShowCheckbox(true)
    setShowEditPopUp(false)

    setStates((pre) => ({ ...pre, edit: true }))


  }

  const handleDataSubmit = () => {
    setSubmitForm(true);
    if (flowType == 2) {

      // call Redirect to CJ Api here 

      axios.post('http://hackathonbackend-psi.vercel.app/api/generateRedirectLink', {
        "LeadID": 111,
        "CustomerID": 12345,
        "ProductID": 2,
        "fieldList": state
      })
        .then((response) => {
          console.log(response)
          if (response.statusCode === 200) {
              window.open(response.redirectUrl)
          }
        })
        .catch((err) => {
          console.log(err)
        });

      console.log('heree');
    }

  }



  if (user?.data) {
    return (
      showSkeletonForm ? <SkeletonLoader width={630} count={30} /> : 
      <div className='detail-main-container'>
        <DetailComponent data={user?.data} onClick={handleCheckBoxFormState} state={state} isCheckBox={showCheckBox} />
        <BottomButtons handleEdit={handleEdit} data={holdARR} handleDataSubmit={handleDataSubmit} />


        {showEditPopUp ? <PopUpAfterEdit handleModalCancel={handleModalCancel} handleModalProceed={handleModalProceed} /> : ""}

        {submitForm && flowType == 1 && <SubmitProposal setSubmitForm={setSubmitForm} submitForm={submitForm} />}
      </div>
    )
  }
}

export default DetailContainer


const BottomButtons = ({ data, handleEdit, handleSubmit, setSubmitForm, handleDataSubmit }) => {
  return (<div className='detail-bottom-container'>
    <button onClick={handleEdit} className='edit-btn btn'>Edit details</button>
    <button className='submit-btn btn' onClick={() => handleDataSubmit()}>Submit</button>
  </div>)
}