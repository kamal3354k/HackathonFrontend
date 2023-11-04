import React, { useEffect, useState } from 'react'
import DetailContainer from '../../container/detailContainer/DetailContainer'
import  notifyIcon  from '../../assets/utils/notify.gif'
import "./style.css"
import { useUserContext } from '../../provider/userProvider'
import Header from '../../components/header/Header'
import NeedHelpIcon from "../../assets/icons/Need_help_icon.svg"
import SkeletonLoader from '../../components/skeletonLoader/SkeletonLoader'



const DetailPage = () => {
  const [showSkeleton, setshowSkeleton] = useState(true)

  const {
    user, setStates
  } = useUserContext();


  useEffect(() => {
    const timer = setTimeout(() => {
      setshowSkeleton(false)
    }, 2000)
    return () => {
      clearTimeout(timer)
    };
  }, [user.edit])


  useEffect(() => {
    setStates((pre) => ({ ...pre, edit: false }))
  }, [])

  if (user?.error) {
    return <p>Error: {user?.error?.message}</p>;
  }


  return (
    <>
      <Header />

      <div className='layout'>
        <DetailContainer setshowSkeleton={setshowSkeleton} />



        {showSkeleton || user?.loading ? <SkeletonLoader width={328} count={3} /> : !user?.edit ? <div className="side-notification-container">
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
          :
          <div className="side-notification-container">
            <div className="row">
              <div className="imgBlock">
                <img src={NeedHelpIcon} alt="NeedHelpIcon" />
              </div>
              <h3>Sushank Kumar<br /><small>ET01123</small></h3>

            </div>

            <div className="row">
              <p>Our advisor will call you soon to assist you with your changes.</p>
            </div>
          </div>}

      </div>
    </>
  )
}

export default DetailPage