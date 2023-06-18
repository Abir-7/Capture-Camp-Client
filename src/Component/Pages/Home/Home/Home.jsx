import React from 'react';
import Banner from '../Banner/Banner';
import PopulerClass from '../PopulerClass/PopulerClass';
import PopulerInstructor from '../PopulerInstructor/PopulerInstructor';
import useTitle from '../../../../Hooks/useTitle';
import AllReviews from '../AllReviews/AllReviews';
import Gallary from '../Gallary/Gallary';
import NewsLetters from '../NewsLetters/NewsLetters';

const Home = () => {
    useTitle('Capture Camp/Home')
    return (
        <div >
          
            <Banner/>
            <PopulerClass></PopulerClass>
           <div>
           <PopulerInstructor></PopulerInstructor>
           </div>
          <div>
          <AllReviews></AllReviews>
          </div>
          <div>
            <Gallary></Gallary>
          </div>
          <div>
            <NewsLetters></NewsLetters>
          </div>

        </div>
    );
};

export default Home;