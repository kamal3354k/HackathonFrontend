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
  const [showSubmitPopUp, setShowSubmitPopUp] = useState(false);
  const [formError,setFormError]=useState(false);

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
    setFormError(false);

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

      if (state.length > 0) {
        // call Redirect to CJ Api here 

        axios.post('https://hackathonbackend-psi.vercel.app/api/generateRedirectLink', {
          "LeadID": 111,
          "CustomerID": 12345,
          "ProductID": 2,
          "fieldList": state
        })
          .then((response) => {
            if (response?.data.statusCode === 200) {
              window.open(response?.data?.redirectUrl, "_blank", "noopener")
            }
          })
          .catch((err) => {
            console.log(err)
          });
      } else {
        setFormError(true);
      }

    }

  }

  useEffect(() => {
    if (!user?.edit) {
      setSubmitForm(false);
      setState([])
      setFlowType(1)
    }
  }, [user?.edit])


  if (user?.data) {
    return (
      showSkeletonForm ? <SkeletonLoader width={630} count={30} /> :
        <div className='detail-main-container'>
          <DetailComponent data={user?.data} onClick={handleCheckBoxFormState} state={state} isCheckBox={showCheckBox} formError={formError}/>
          {/* {formError && <h3>error</h3>} */}
          <BottomButtons handleEdit={handleEdit} data={holdARR} handleDataSubmit={handleDataSubmit} showCheckBox={showCheckBox} />


          {showEditPopUp ? <PopUpAfterEdit handleModalCancel={handleModalCancel} handleModalProceed={handleModalProceed} /> : ""}

          {submitForm && flowType == 1 && <SubmitProposal setSubmitForm={setSubmitForm} submitForm={submitForm} />}
        </div>
    )
  }
}

export default DetailContainer


const BottomButtons = ({ data, handleEdit, handleSubmit, setSubmitForm, handleDataSubmit,showCheckBox }) => {
  return (<div className='detail-bottom-container'>
    {!showCheckBox && <button onClick={handleEdit} className='edit-btn btn'>Edit details</button>}
    <button className='submit-btn btn' onClick={() => handleDataSubmit()}>Submit</button>
  </div>)
}