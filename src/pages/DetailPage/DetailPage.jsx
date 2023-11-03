import React from 'react'
import DetailContainer from '../../container/detailContainer/DetailContainer'
import { notifyIcon } from '../../constant'
import "./style.css"
import { useUserContext } from '../../provider/userProvider'
import Loader from '../../components/loader/Loader'
import Header from '../../components/header/Header'

const DetailPage = () => {

  const {
    user
  } = useUserContext();

  if (user?.loading) {
    return <Loader />;
  }

  if (user?.error) {
    return <p>Error: {user?.error?.message}</p>;
  }


  return (
    <>
      <Header />

      <div className='layout'>
        <DetailContainer />



        <div className="side-notification-container">
          <div className="row">
            <div className="imgBlock">
              <img src={notifyIcon} alt="notify" />
            </div>
            <h3>Please note</h3>
          </div>

          <div className="row">
            <p>These details will be printed in your policy copy and also will be considered at the time of the claim</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailPage