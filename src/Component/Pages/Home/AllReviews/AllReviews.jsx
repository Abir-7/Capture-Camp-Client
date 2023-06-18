
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import img1 from '../../../../assets/enroll.png'
import "./styles.css";

// import required modules
import { Autoplay, EffectCube, Pagination } from "swiper";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Slide,Zoom } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const AllReviews = () => {
    const [axiosSecure] = useAxiosSecure()
    const { data: allReviews, isLoading } = useQuery({
        queryKey: ['allReviews'],

        queryFn: async () => {
            const res = await axiosSecure.get('/reviews');
            return res.data;
        }

    })

    console.log(allReviews)

    return (
        <>
           <Slide direction='right'>
            <hr className="my-5" />

            <div className='my-4'>
                <h1 className='text-center text-[black] mt-5 my text-4xl'>Our Student</h1>
                <h1 className='text-center text-[red] mb-2 text-3xl'>Reviews</h1>
                <hr className=' w-1/3 mx-auto mb-5' />

            </div>

            <div className="grid  gap-10 grid-cols-1 md:grid-cols-2 items-center bg-slate-50 mb-7 py-5 px-8 rounded-lg">
                <div className="min-h-[300px]" >
                    <Swiper
                        effect={"cube"}
                        grabCursor={true}

                        cubeEffect={{
                            shadow: true,
                            slideShadows: true,
                            shadowOffset: 20,
                            shadowScale: 0.94,
                        }}
                        autoplay={true}
                        pagination={true}
                        modules={[EffectCube, Autoplay, Pagination]}
                        className="mySwiper "
                    >
                        {
                            allReviews?.map(reviews => <SwiperSlide key={reviews._id}>
                                <div className="card  bg-slate-100 shadow-xl">
                                    <figure className="">
                                        <img style={{ borderRadius: '50%', width: '150px', height: '150px',objectFit:'cover' }} src={reviews.userPhoto} alt="Shoes" className="rounded-xl mt-9" />
                                    </figure>
                                    <div className="card-body items-center text-center">
                                        <h2 className="card-title  text-black" >{reviews.username}</h2>
                                        <p className="text-red-600 text-lg">{reviews.className}</p>
                                        <p className="text-black">{reviews.review}</p>
                                        <p className="text-black flex items-center mt-1 gap-2">Rating: {reviews.rating}     <Rating className=' text-xl text-yellow-500'
                                            initialRating={reviews.rating}
                                            emptySymbol={<FaRegStar />}
                                            fullSymbol={<FaStar />}
                                            readonly
                                        /></p>

                                    </div>
                                </div>
                            </SwiperSlide>)
                        }

                    </Swiper>
                </div>

                <div className="">
                    <h1 className="text-center text-[black] mb-2 font-semibold text-5xl ">What are you waiting for??</h1>
                    <div className="flex justify-center mt-4">
                        <Zoom>
                        <Link to='/approvedclass'><img className="duration-300 hover:duration-300 hover:origin-top-left hover:rotate-12" width={'200px'} src={img1} alt="" /></Link>
                        </Zoom>
                      
                    </div>
                </div>
            </div>
            </Slide>
        </>
    );
};

export default AllReviews;

