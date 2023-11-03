import React from 'react'
import "./style.css"
import LeftIcon from "../../assets/icons/left-arrow.svg"
import BlueRect from "../../assets/utils/Rectangle.svg"
import { Link } from 'react-router-dom';

const DetailComponent = ({ data, ...props }) => {
  const { PropserDetails, ContactDetails, InsuredDetails, PolicyDetails } = data


  return (
    <div className='detail-container'>
      <div className="detail-header" style={{ backgroundImage: `url(${BlueRect})` }}>
        <Link to="/"><img src={LeftIcon} alt="" /></Link>
        <h4>Review your proposal form</h4>
      </div>
      <div className="detail-body">
        <div className="detail-item">
          <h3 className="title">Proposer Details</h3>
          <div className="detail-content">
            {PropserDetails && PropserDetails.map((item) => {
              return (<DetailItem {...props} key={item.ID} id={item.ID} label={item.Label} value={item.Value} />)
            })}
          </div>
        </div>


        <div className="detail-item">
          <h3 className="title">Contact Details</h3>
          <div className="detail-content">
            {ContactDetails && ContactDetails.map((item) => {
              return (<DetailItem {...props} key={item.ID} id={item.ID} label={item.Label} value={item.Value} />)
            })}
          </div>
        </div>


        <div className="detail-item">
          <h3 className="title">Insured Details</h3>
          <div className="detail-content">
            {InsuredDetails && InsuredDetails.map((item) => {
              return (<DetailItem {...props} key={item.ID} id={item.ID} label={item.Label} value={item.Value} />)
            })}
          </div>
        </div>


        <div className="detail-item">
          <h3 className="title">Policy Details</h3>
          <div className="detail-content">
            {PolicyDetails && PolicyDetails.map((item) => {
              return (<DetailItem {...props} key={item.ID} id={item.ID} label={item.Label} value={item.Value} />)
            })}
          </div>
        </div>



      </div>
    </div>
  )
}

export default DetailComponent

const DetailItem = (props) => {
  const { label, value, isCheckBox,id } = props;
  return (<div className="detail-content-item">
    <div className="first-box">{isCheckBox ? <span><input {...props} value={id} type="checkbox" /></span> : ""}{label}</div>
    <div className="second-box">{value}</div>
  </div>)
}