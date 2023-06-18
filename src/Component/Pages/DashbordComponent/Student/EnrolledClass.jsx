import 'animate.css';
import { Bounce,  Slide } from "react-awesome-reveal"
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useRef, useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { Authcontext } from '../../../AuthProvider/AuthProvider';
import useTitle from '../../../../Hooks/useTitle';
import Rating from 'react-rating';
import { FaStar, FaRegStar } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const EnrolledClass = () => {
    useTitle('Capture Camp/Enrolled Class')
    const { user, loader } = useContext(Authcontext)
    const [axiosSecure] = useAxiosSecure()
    const { data: enrolledClass, isLoading } = useQuery({
        queryKey: ['enrolledClass', user?.email],
        enabled: !loader,
        queryFn: async () => {
            const res = await axiosSecure.get(`/enrolledclass?email=${user?.email}`);
            return res.data;
        }
    })
    console.log(enrolledClass)

    //modal data
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [review, setReview] = useState('');
    const [className, setClassName] = useState('');
    const [rating, setRating] = useState(0);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform your desired action with the form data (e.g., submit the data to the server)
        console.log('Username:', username);
        console.log('Review:', review);
        console.log('Class Name:', className);
        console.log('Rating:', rating);


        const data = { username, review, className, rating,userPhoto:user.photoURL}
        fetch(`https://capture-camp-server.vercel.app/reviews`, {
            method: "POST",
            headers: {
                'authorization': `Bearer ${localStorage.getItem('access-token')}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {

                if (data.insertedId) {
                    toast("Review Given!")
                }
                if (data.msg) {
                    toast("Review Already Added!")
                }
            })





        // Clear the form fields
        setUsername('');
        setReview('');
        setClassName('');
        setRating(0);



        // Close the modal
        handleCloseModal();
    }

    //modal end


    console.log(className)

    return (
        <>
            <div className='grid mx-2 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
                {
                    enrolledClass?.map((clas) => <Slide key={clas._id} direction='right'>

                        <div className="card mx-1 bg-slate-50 shadow-xl animate__fadeInRight ">

                            <div className='flex flex-col '>
                                <figure className='pt-5 px-5'><img src={clas.classInfo[0].class_image} alt="Shoes" /></figure>
                                <div className="card-body min-h-[300px] ">
                                    <h2 className="card-title text-black">{clas.classInfo[0].class}</h2>
                                    <p className='text-black'>Instructor: {clas.classInfo[0].name}</p>
                                    <p className='text-black'>Available seats: {clas.classInfo[0].seats}</p>
                                    <p className='text-black'>Price: {clas.classInfo[0].price}$</p>
                                    <div className="card-actions  justify-end">
                                        <button onClick={() => {
                                            setUsername(user.displayName)
                                            setClassName(clas.classInfo[0].class)
                                            handleOpenModal()
                                        }} className="btn border-none text-white hover:bg-[#ce1010] bg-[red] btn-sm ">Review</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Slide>
                    )
                }


            </div>
            {
            isOpen && (
                
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-slate-100 rounded-lg p-8 max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
                        <form onSubmit={handleSubmit}>
                            <label className="block mb-4">
                                Username:
                                <input
                                    className="border border-gray-300 rounded w-full py-2 px-3 mt-1"
                                    placeholder={user.displayName}
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </label>
                            <label className="block mb-4">
                                Review:
                                <textarea
                                    className="border border-gray-300 rounded w-full py-2 px-3 mt-1"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    required
                                ></textarea>
                            </label>
                            <label className="block mb-4">
                                Class Name:
                                <input
                                    className="border border-gray-300 rounded w-full py-2 px-3 mt-1"
                                    type="text"
                                    value={className}
                                    placeholder={'Class Name'}
                                    onChange={(e) => setClassName(e.target.value)}
                                    required
                                />
                            </label>
                            <label className="flex mb-4 gap-3 ">
                                Rating: 
                                <Rating className=' text-xl'
                                    initialRating={rating}
                                    emptySymbol={<FaRegStar />}
                                    fullSymbol={<FaStar />}
                                    onChange={(value) => setRating(value)}
                                />
                            </label>
                            <div className='flex gap-4'>
                                <button
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    type="submit"
                                >
                                    Submit
                                </button>
                                <button
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={handleCloseModal}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            
            )}
  <ToastContainer></ToastContainer>
        </>
    );
};

export default EnrolledClass;