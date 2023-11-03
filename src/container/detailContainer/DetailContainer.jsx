import React, { useEffect, useState } from 'react'
import DetailComponent from '../../components/DetailComponent/DetailComponent'
import "./style.css"
import { useUserContext } from '../../provider/userProvider';
import PopUpAfterEdit from '../../components/popupAfterEdit/PopUpAfterEdit';
import { SubmitProposal } from '../../components/SubmitProposalForm/SubmitPropsal';

let holdARR = [];
const DetailContainer = () => {

  const [state, setState] = useState([]);
  const [submitForm,setSubmitForm]=useState(false);
  const [showCheckBox, setShowCheckbox] = useState(false)
  const [showEditPopUp, setShowEditPopUp] = useState(false)

  const {
    user
  } = useUserContext();

  const handleCheckBoxFormState = ({ target: { value } }) => {
    let val = Number(value)
    if (!holdARR.includes(val)) { holdARR.push(val) }
    else {
      holdARR = state.filter((item) => item !== val)
    }
    setState(holdARR)
  }


  const handleEdit = () => {
    setShowEditPopUp(true)
  }

  const handleModalCancel = () => {
    setShowEditPopUp(false)
    setShowCheckbox(false)

  }

  const handleModalProceed = () => {
    setShowCheckbox(true)
    setShowEditPopUp(false)
  }



  if (user?.data) {
    return (
      <div className='detail-main-container'>
        <DetailComponent data={user?.data} onClick={handleCheckBoxFormState} state={state} isCheckBox={showCheckBox} />
        <BottomButtons handleEdit={handleEdit} data={holdARR}  setSubmitForm={setSubmitForm}/>
        {showEditPopUp ? <PopUpAfterEdit handleModalCancel={handleModalCancel} handleModalProceed={handleModalProceed} /> : ""}
      {submitForm && <SubmitProposal setSubmitForm={setSubmitForm} submitForm={submitForm}/> }
      </div>
    )
  }
}

export default DetailContainer


const BottomButtons = ({ data, handleEdit, handleSubmit,setSubmitForm}) => {
  return (<div className='detail-bottom-container'>
    <button onClick={handleEdit} className='edit-btn btn'>Edit details</button>
    <button className='submit-btn btn' onClick={()=>setSubmitForm(true)}>Submit</button>
  </div>)
}