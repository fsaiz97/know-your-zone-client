import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import InnerNav from '../InnerNav';

function PageWrapper({
  motto,
  navSearchSearching,
  setMotto
}) {
  // const [isLoading, setIsLoading] = useState(true); // TODO - Investigate unused but potentially useful states and hooks
  const [boroughData, setBoroughData] = useState([]);
  // const [boroughFound, setBoroughFound] = useState(true); // TODO - Investigate unused but potentially useful states and hooks
  let boroughName = sessionStorage.getItem('borough');
  // const navigate = useNavigate(); // TODO - Investigate unused but potentially useful states and hooks
  useEffect(() => {
    async function getBoroughInfo() {
      // setIsLoading(true); // TODO - Investigate unused but potentially useful states and hooks
      try {
        const response = await fetch(
          `http://localhost:3000/summary/${boroughName}`
        );
        const rawData = await response.json();
        setBoroughData(rawData);
        setMotto(rawData['motto']);
        // setBoroughFound(true); // TODO - Investigate unused but potentially useful states and hooks
      } catch (err) {
        console.log(err);
        // setBoroughFound(false); // TODO - Investigate unused but potentially useful states and hooks
      }
    }
    getBoroughInfo();
  }, [navSearchSearching]);

  if (boroughData.borough_name) {
    return (
      <div className='page-wrapper'>
        <h1>{boroughData['borough_name']}</h1>
        <h3 className='motto'>
          <em>"{motto}"</em>
        </h3>
        <InnerNav />
        <Outlet />
      </div>
    );
  } else {
    return null;
  }
}

export default PageWrapper;
