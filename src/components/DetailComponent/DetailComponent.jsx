import React from 'react'
import "./style.css"
import LeftIcon from "../../assets/icons/left-arrow.svg"
import BlueRect from "../../assets/utils/Rectangle.png"
import BajajImage from "../../assets/utils/bajajImage.png"

import { Link } from 'react-router-dom';

const DetailComponent = ({ data, formError,...props }) => {
  const { PropserDetails, ContactDetails, InsuredDetails, NomineeDetails, ...rest } = data

  return (
    <div className='detail-container'>
      <div className="detail-header" style={{ backgroundImage: `url(${BlueRect})` }}>
        <h4><Link to="/"><img src={LeftIcon} alt="" /></Link><h4>Review your application</h4></h4>

        <div className="content-item">
          <h3>Smart Protect Goal Life Cover plus <span>Health Insurance</span></h3>
          <div className="container">

            <span className="image-container">
              <div className="inner-container">
                <img src={BajajImage} alt="bajaj image" />
              </div>
            </span>
            <div className="container-content">
              <div className="conatiner-item">
                <h4>Proposar</h4>
                <h3>{rest?.Name}</h3>
              </div>
              <div className="conatiner-item">
                <h4>Booking ID</h4>
                <h3>{rest?.ProposalNumber}</h3>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="detail-body">
        {PropserDetails && <div className="detail-item">
          <h3 className="title">Proposer Details</h3>
          <div className="detail-content">
            {PropserDetails.map((item) => {
              return (<DetailItem {...props} key={item.ID} id={item.ID} label={item.Label} value={item.Value} />)
            })}
          </div>
        </div>}


        {ContactDetails && <div className="detail-item">
          <h3 className="title">Contact Details</h3>
          <div className="detail-content">
            {ContactDetails.map((item) => {
              return (<DetailItem {...props} key={item.ID} id={item.ID} label={item.Label} value={item.Value} />)
            })}
          </div>
        </div>}


        {InsuredDetails && <div className="detail-item">
          <h3 className="title">Insured Details</h3>
          <div className="detail-content">
            {InsuredDetails.map((item) => {
              return (<DetailItem {...props} key={item.ID} id={item.ID} label={item.Label} value={item.Value} />)
            })}
          </div>
        </div>}


        {NomineeDetails && <div className="detail-item">
          <h3 className="title">Nominee Details</h3>
          <div className="detail-content">
            {NomineeDetails.map((item) => {
              return (<DetailItem {...props} key={item.ID} id={item.ID} label={item.Label} value={item.Value} />)
            })}
          </div>
        </div>}

        {formError && <span  className="error-text">Please select atleast one field</span>}

      </div>
    </div>
  )
}

export default DetailComponent

const DetailItem = (props) => {
  const { label, value, isCheckBox, id } = props;
  return (<div className="detail-content-item">
    <div className="first-box">{isCheckBox ? <span className='checkbox-span'><input {...props} value={id} type="checkbox" /></span> : ""}{label}</div>
    <div className="second-box">{value}</div>
  </div>)
}