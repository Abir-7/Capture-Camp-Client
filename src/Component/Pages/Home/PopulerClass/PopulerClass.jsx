import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow, Pagination } from "swiper";

import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Slide } from "react-awesome-reveal"
import { Link } from 'react-router-dom';
import useInstructor from '../../../../Hooks/useInstructor';
import useAdmin from '../../../../Hooks/useAdmin';
import { Authcontext } from '../../../AuthProvider/AuthProvider';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react';

const PopulerClass = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useContext(Authcontext)
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor()

    const [axiosSecure] = useAxiosSecure()
    const { data: topClass, isLoading } = useQuery({
        queryKey: ['topClass'],

        queryFn: async () => {
            const res = await axiosSecure.get('/topapprovedclass');
            return res.data;
        }
    })
    console.log(topClass)


    const selectClass = (clas) => {
        const { _id: class_id, name, email, class: className, class_image, seats, price, status, feedback } = clas;
        const data = { class_id, name, email, className, class_image, seats, price, status, feedback, student_email: user?.email }
        console.log(data)

        fetch(`https://capture-camp-server.vercel.app/selectedclass`, {
            method: "POST",
            headers: {
                'authorization': `Bearer ${localStorage.getItem('access-token')}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    setIsModalOpen(true);
                }
                if (data.insertedId) {

                    toast("Class Added to Selected Class Section!")
                }
                if (data.msg == 'duplicate') {
                    toast("Class Already Added!")
                }
                if (data.msg == 'enrolled') {
                    toast("Already Enrolled!")
                }

            })
    }


    const handleConfirm = () => {
        setIsModalOpen(false)
        navigate('/login')
    }




    return (
        <>
            <Slide  direction='right'>
                <div className='my-4'>
                    <h1 className='text-center text-[black] mt-5 my text-4xl'>Watch Out Our</h1>
                    <h1 className='text-center text-[red] mb-2 text-3xl'>Populer Class</h1>
                    <hr className=' w-1/3 mx-auto mb-5' />

                    <div >

                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            autoplay={{
                                delay: 1500,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 40,
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 50,
                                },
                            }}
                            modules={[Autoplay, Pagination]}
                            className="mySwiper"
                        >

                            {

                                topClass?.map(clas => <SwiperSlide key={clas._id}>
                                    <div className='pt-5 pb-10'>
                                        <div className="card mx-1 bg-slate-50 shadow-xl ">
                                            <div className='flex flex-col '>
                                                <figure><img src={clas.class_image} alt="Shoes" /></figure>
                                                <div className="card-body min-h-[300px] ">
                                                    <h2 className="card-title text-black">{clas.class}</h2>
                                                    <p className='text-black'> <span className='font-semibold '>Instructor:</span> {clas.name}</p>
                                                    <p className='text-black'><span className='font-semibold '>Available seats: </span>  {clas.seats}</p>
                                                    <p className='text-black'><span className='font-semibold '>Total Student: </span> {clas.student} </p>
                                                    <button onClick={() => { selectClass(clas) }} disabled={isInstructor || isAdmin || clas.seats == 0} className="btn bg-[red] hover:bg-[#c91919] border-none mt-2 text-white " to='/approvedclass'>Select</button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>)

                            }

                        </Swiper>

                    </div>

                </div>
            </Slide>

            <ToastContainer></ToastContainer>
            {isModalOpen && (

                <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md">
                        <p className="text-center">You Have To Log In First!</p>
                        <div className="flex justify-center mt-4">
                            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => { handleConfirm() }}>Ok</button>

                        </div>
                    </div>
                </div>

            )}

        </>
    );
};

export default PopulerClass;