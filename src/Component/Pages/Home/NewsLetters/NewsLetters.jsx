import React from 'react';
import msg from '../../../../assets/msg.png'
import { Slide } from 'react-awesome-reveal';
const NewsLetters = () => {
    return (
        <Slide direction='right'> 
        <div className='flex justify-center my-5 bg-slate-50'>
           
            <div className="grid grid-cols-1 md:grid-cols-3 justify-around items-center ">
                <div className='' >
                    <div className=" p-4">
                        <img src={msg} alt="Image" className="w-[60vh]" />
                    </div>
                </div>
                <div className='' >
                    <div className="p-4 text-center">
                        <h1 className='text-4xl font-semibold text-red-600'>Let’s Join To Our Newsletters</h1>
                    </div>
                </div>
                <div className=' flex mx-2 relative md:me-16  '>
                    <input type="email" placeholder="Enter your email" className=" w-full focus:border-none focus:outline-none p-3 bg-slate-100 rounded-full shadow-md" />
                    <button style={{ boxShadow:'-3px 0 4px rgba(0, 0, 0, 0.5)'}} className=" absolute right-0 bg-red-600 duration-200 hover:bg-red-700 text-white font-semibold p-3 rounded-full ">
                        Subscribe
                    </button>
                 
                </div>
            </div>

        </div>
        </Slide>
    );
};

export default NewsLetters;