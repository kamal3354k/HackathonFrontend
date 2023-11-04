import React from 'react'
import HomeScreen from "../../assets/utils/home_page.svg"
import { Link } from 'react-router-dom';
import "./style.css"
import Modal from '../../components/modal/Modal';
import { useUserContext } from '../../provider/userProvider';
import Loader from '../../components/loader/Loader';

const Home = () => {
  const {
    user
  } = useUserContext();

  if (user?.loading) {
    return <Loader/>;
  }

  if (user?.error) {
    return <p>Error: {user?.error?.message}</p>;
  }

  return   user?.data?.Name && (
    <><Modal label={user?.data?.Name} value={user?.data?.ProposalNumber} />
      <div className='home-container'>
        <img src={HomeScreen} alt="home screen" useMap='#homeScreen' />
          <Link className="top" to="/detail-page">
            {/* <area shape="rect" coords="768, 357,1100,400" alt="detail page" />
            <area shape="rect" coords="1284, 736,1468,783" alt="details page" /> */}
          </Link>
          <Link className="bottom" to="/detail-page">
            {/* <area shape="rect" coords="768, 357,1100,400" alt="detail page" />
            <area shape="rect" coords="1284, 736,1468,783" alt="details page" /> */}
          </Link>
      </div>
    </>
  )
}

export default Home