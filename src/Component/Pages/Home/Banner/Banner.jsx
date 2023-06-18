import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from '../../../../assets/banner/b1.jpg'
import img2 from '../../../../assets/banner/b2.jpg'
import img3 from '../../../../assets/banner/b3.jpg'
import img4 from '../../../../assets/banner/b4.jpg'
import { Slide } from "react-awesome-reveal"
const Banner = () => {
    return (
        <Slide direction='left'>
        <div className='rounded-lg my-2 shadow-lg'>
            <Carousel autoPlay={true} showStatus={false} infiniteLoop={true} interval='2000' showThumbs={false} className='text-center min-h-[60vh] ' >
                <div className='min-h-[40vh]' >
                    {/* <img src={img1} /> */}
                    <div className="hero md:px-20 min-h-[60vh] bg-slate-50 ">
                        <div className="hero-content flex-col lg:flex-row">
                            <img src={img1} className="max-w-sm rounded-lg drop-shadow-2xl" />
                            <div>
                                <h1 className="text-5xl text-[red] font-bold">Wild photography!</h1>
                                <p className="py-6 text-black">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {/* <img src={img2} /> */}
                    <div className="hero md:px-20 min-h-[60vh] bg-slate-50 ">
                        <div className="hero-content flex-col lg:flex-row">
                            <img src={img2} className="max-w-sm rounded-lg drop-shadow-2xl" />
                            <div>
                                <h1 className="text-5xl text-[red] font-bold">Product photography!</h1>
                                <p className="py-6 text-black">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>

                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    {/* <img src={img3} /> */}
                    <div className="hero md:px-20 min-h-[60vh] bg-slate-50 ">
                        <div className="hero-content flex-col lg:flex-row">
                            <img src={img3} className="max-w-sm rounded-lg drop-shadow-2xl" />
                            <div>
                                <h1 className="text-5xl text-[red] font-bold">Travel photography!</h1>
                                <p className="py-6 text-black">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>

                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {/* <img src={img4} /> */}
                    <div className="hero md:px-20 min-h-[60vh] bg-slate-50 ">
                        <div className="hero-content flex-col lg:flex-row">
                            <img src={img4} className="max-w-sm rounded-lg drop-shadow-2xl" />
                            <div>
                                <h1 className="text-5xl text-[red] font-bold">Landscape photography!</h1>
                                <p className="py-6 text-black">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>

                            </div>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
        </Slide>
    );
};

export default Banner;