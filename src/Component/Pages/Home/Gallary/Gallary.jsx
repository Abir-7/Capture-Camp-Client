import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import './Gallary.css'


// import required modules
import { Autoplay, EffectCoverflow, Pagination } from "swiper";

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { Slide } from 'react-awesome-reveal';

const Gallary = () => {
  const [axiosSecure] = useAxiosSecure()
  //get photos
  const { data: photos, refetch, isLoading: p_loading } = useQuery({
    queryKey: ['allphotos'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/photos`);
      return res.data;
    }
  })

  return (
    <div >
    <Slide>
      <hr className="my-5" />

      <div className='my-4'>
        <h1 className='text-center text-[black] mt-5 my text-4xl'>Our Student</h1>
        <h1 className='text-center text-[red] mb-2 text-3xl'>Photos</h1>
        <hr className=' w-1/3 mx-auto mb-5' />

      </div>

<div className='bg-slate-50'>
      <Swiper
        effect={"coverflow"}
   
        centeredSlides={true}
        autoplay={true}
        slidesPerView={"auto"}
        initialSlide={2}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Autoplay, Pagination]}
        className="mySwiper"
      >
        {
          photos?.map(photo => <SwiperSlide key={photo._id}>
            <img src={photo.photo} />
          </SwiperSlide>)
        }
      </Swiper>
      </div>
      </Slide>
    </div>
  );
};

export default Gallary;