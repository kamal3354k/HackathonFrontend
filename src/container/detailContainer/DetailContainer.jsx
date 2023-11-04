import React, { useEffect, useState } from 'react'
import DetailComponent from '../../components/DetailComponent/DetailComponent'
import "./style.css"
import { useUserContext } from '../../provider/userProvider';
import PopUpAfterEdit from '../../components/popupAfterEdit/PopUpAfterEdit';
import { SubmitProposal } from '../../components/SubmitProposalForm/SubmitPropsal';
import SkeletonLoader from '../../components/skeletonLoader/SkeletonLoader';

let holdARR = [];
const DetailContainer = ({ setshowSkeleton }) => {

  const [state, setState] = useState([]);
  const [submitForm, setSubmitForm] = useState(false);
  const [showCheckBox, setShowCheckbox] = useState(false)
  const [showEditPopUp, setShowEditPopUp] = useState(false);

  // flowType=1 // All Details OK push to insurer
  // flowType=2 // Edit and redirect to CJ

  const [flowType,setFlowType]=useState(1);

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
    let val = Number(value)
    if (!holdARR.includes(val)) { holdARR.push(val) }
    else {
      holdARR = state.filter((item) => item !== val)
    }
    setState(holdARR)
  }


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
     if(flowType==2){

      // call Redirect to CJ Api here 
      
      console.log('heree');
     }

  }



  if (user?.data) {
    return (
      showSkeletonForm ? <SkeletonLoader width={630} count={30} /> : <div className='detail-main-container'>
        <DetailComponent data={user?.data} onClick={handleCheckBoxFormState} state={state} isCheckBox={showCheckBox} />
        <BottomButtons handleEdit={handleEdit} data={holdARR} handleDataSubmit={handleDataSubmit} />
        {showEditPopUp ? <PopUpAfterEdit handleModalCancel={handleModalCancel} handleModalProceed={handleModalProceed}/> : ""}
        {submitForm && flowType==1 && <SubmitProposal setSubmitForm={setSubmitForm} submitForm={submitForm}/>}
      </div>
    )
  }
}

export default DetailContainer


const BottomButtons = ({ data, handleEdit, handleSubmit, setSubmitForm,handleDataSubmit }) => {
  return (<div className='detail-bottom-container'>
    <button onClick={handleEdit} className='edit-btn btn'>Edit details</button>
    <button className='submit-btn btn' onClick={() => handleDataSubmit()}>Submit</button>
  </div>)
}