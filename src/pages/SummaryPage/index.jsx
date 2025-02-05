import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BsEmojiSmile,
  BsFillArrowUpSquareFill,
  BsFillArrowDownSquareFill,
} from 'react-icons/bs';

import { BigNumberCard, CardHIP, CardHPP, CardHEI } from '../../components';

import './summary.css';

export default function SummaryPage({ navSearchSearching }) {
  const [isLoading, setIsLoading] = useState(true);
  const [boroughData, setBoroughData] = useState([]);
  const [wellbeingScore, setWellbeingScore] = useState(0);
  const [boroughFound, setBoroughFound] = useState(true);
  const [dataVisualisationdData, setDataVisualisationData] = useState([]);
  const navigate = useNavigate();
  //For later use - fetch request example
  // Get saved data from sessionStorage
  let boroughName = sessionStorage.getItem('borough');
  useEffect(() => {
    async function getBoroughInfo() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/summary/${boroughName}`
        );
        const rawData = await response.json();
        setBoroughData(rawData);

        const dataVisualisation = await fetch(
          `http://localhost:3000/demographics/${boroughName}/ethnicity`
        );
        const visualisationPoints = await dataVisualisation.json();
        setDataVisualisationData(visualisationPoints);
        // setMotto(rawData['motto']);
        // console.log('raw data', rawData);

        const wellbeingResponse = await fetch(
          `http://localhost:3000/demographics/${boroughName}/wellbeing`
        );
        const wellbeingData = await wellbeingResponse.json();
        setWellbeingScore(wellbeingData['data'][4]['value']);

        setIsLoading(false);
      } catch (err) {
        console.log(err);

        // setTimeout(() => {
        //   navigate('/');
        // }, 5000);
      }
    }
    getBoroughInfo();
  }, [navSearchSearching]);

  if (isLoading === false) {
    return (
      <AnimatePresence>
        <motion.div
          className='six-tile-wrapper'
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
        >
          <BigNumberCard
            className={'yellow six-tile'}
            value={`£${boroughData['average_monthly_rent']}`}
            smallNumber={'pcm'}
            secondaryInfo={'Average rent across all accomodation types'}
          />
          <CardHIP
            className={'blue six-tile'}
            heading={'Population of people of each race'}
            dataResponse={dataVisualisationdData}
            chartType={'donut'}
          />
          <BigNumberCard
            className={'pink six-tile'}
            value={boroughData['crime_rate_per_1000'].toFixed(2)}
            smallNumber={'/1000'}
            secondaryInfo={'Average crime rate for the last six months'}
          />
          <CardHPP
            className={'yellow six-tile'}
            heading={'Rent'}
            primaryInfo={
              boroughData['rent_below_london_average'] ? (
                <BsFillArrowDownSquareFill size={75} />
              ) : (
                <BsFillArrowUpSquareFill size={75} />
              )
            }
            secondaryInfo={`${
              boroughData['rent_below_london_average'] === true
                ? 'Below London average'
                : 'Above London average'
            }`}
          />

          <CardHEI
            className={'blue six-tile'}
            heading={'Wellbeing'}
            emoji={`${wellbeingScore > 7.3 ? '😎' : '🙂'}`}
            secondaryInfo={`The wellbeing score is ${wellbeingScore}!`}
          />
          <CardHPP
            className={'pink six-tile'}
            heading={'Crime'}
            primaryInfo={
              boroughData['crime_below_london_average'] ? (
                <BsFillArrowDownSquareFill size={75} />
              ) : (
                <BsFillArrowUpSquareFill size={75} />
              )
            }
            secondaryInfo={`${
              boroughData['crime_below_london_average']
                ? 'Below London average'
                : 'Above London average'
            }`}
          />
        </motion.div>
      </AnimatePresence>
    );
  } // else {
  //   return (
  //     <div className="page-wrapper">
  //       <h1>Borough Info is loading...</h1>
  //       <h3 className="motto">
  //         <em>"We Serve"</em>
  //       </h3>
  //       <InnerNav />
  //       <div className="wellbeing-wrapper"></div>
  //     </div>
  //   );
  // }
}

// {
//   `${
//     wellbeingScore > 7.3 ? (
//       <FontAwesomeIcon icon='fa-regular fa-face-smile-beam' />
//     ) : (
//       '🙂'
//     )
//   }`;
// }
