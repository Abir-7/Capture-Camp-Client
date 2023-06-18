import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigetionBar from '../SharedPages/NavigetionBar/NavigetionBar';
import Footer from '../SharedPages/Footer/Footer';

const MainPage = () => {
    return (
        <div>
            <NavigetionBar></NavigetionBar>
           <div className='min-h-[80vh]'>
           <Outlet></Outlet>
           </div>
            <Footer></Footer>
        </div>
    );
};

export default MainPage;