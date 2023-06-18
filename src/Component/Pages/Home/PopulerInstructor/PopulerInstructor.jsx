

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Slide } from "react-awesome-reveal"

// import required modules
import { Autoplay, Navigation } from "swiper";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Authcontext } from "../../../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";


const PopulerInstructor = () => {
  const { user, loader } = useContext(Authcontext)



  const [axiosSecure] = useAxiosSecure()
  const { data: topInstructor, isLoading } = useQuery({
    queryKey: ['topInstructor'],

    queryFn: async () => {
      const res = await axiosSecure.get('/topInstructor');
      return res.data;
    }
  })

  console.log(topInstructor)


  return (
    <Slide>
      <div className="my-5 mx-2  ">
        <h1 className="text-center text-4xl text-black">Meet Our Top</h1>
        <h1 className="text-center text-3xl mb-2 text-[red]" >Instructors</h1>
        <hr className=' w-1/3 mx-auto mb-5' />
        <div className="shadow-md p-10">
          <Swiper
            // spaceBetween={30}
            // centeredSlides={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}

            navigation={false}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
          >

            {
              topInstructor?.map((instructor, index) => <SwiperSlide key={index}>


                <div className="card lg:card-side bg-slate-50 rounded-lg">
                  <figure className="max-w-[400px] rounded-lg"><img style={{ height: '300px', width: '400px',objectFit:'cover' }} className=" rounded-lg" src={instructor?.top_instructor[0]?.photo} alt="" /></figure>
                  <div className="card-body text-black rounded-lg">
                    <h1 className="text-2xl text-black"><span className="font-semibold">Name: </span>{instructor?.top_instructor[0]?.name}</h1>
                    <p className="text-md  text-black"><span className="font-semibold ">Email:</span> {instructor?.top_instructor[0]?.email}</p>
                    <h1 className="  text-black "><span className="font-semibold">Class:</span> {instructor?.class}</h1>
                    <h1 className="  text-black "><span className="font-semibold">Total Students: </span> {instructor?.student}</h1>
                    <div className="card-actions justify-end">
                  <Link className="btn bg-[red] hover:bg-[#c91919] border-none mt-2 text-white " to='/approvedclass'>See All Class</Link> 
                    </div>
                  </div>
                </div>






                {/*                 
                <div className="flex justify-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-40">
                    <div className="max-w-[400px] rounded-lg">
                      <img style={{ height: '200px', width: '300px' }} className=" rounded-lg" src={instructor?.top_instructor[0]?.photo} alt="" />
                    </div>
                    <div className=" flex flex-col items-center justify-center">
                      <div className="p-5">
                       
                      </div>
                    </div>
                  </div>
                </div> */}
              </SwiperSlide>)
            }
          </Swiper>
        </div>
      </div>
    </Slide>

  );
};

export default PopulerInstructor;



