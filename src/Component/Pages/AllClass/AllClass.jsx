import { Roll } from "react-awesome-reveal"
import React, { useEffect, useState } from 'react';
import useAdmin from '../../../Hooks/useAdmin';
import useInstructor from '../../../Hooks/useInstructor';
import { useContext } from 'react';
import { Authcontext } from '../../AuthProvider/AuthProvider';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


import { useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useTitle from "../../../Hooks/useTitle";

const AllClass = () => {
    useTitle('Capture Camp/Classes')
    const { user, loader } = useContext(Authcontext)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor()
    // const [approvedClass, setApprovedClass] = useState([])
    const navigate = useNavigate()

    const [axiosSecure] = useAxiosSecure()
    const { data: approvedClass, isLoading } = useQuery({
        queryKey: ['approvedclass'],

        queryFn: async () => {
            const res = await axiosSecure.get('/approvedclass');
            return res.data;
        }
    })


    // useEffect(() => {
    //     fetch('https://capture-camp-server.vercel.app/approvedclass')
    //         .then(res => res.json())
    //         .then(data => setApprovedClass(data))
    // }, [])
    console.log(approvedClass)

    const selectClass = (a_class) => {
        const { _id: class_id, name, email, class: className, class_image, seats, price, status, feedback } = a_class;
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
                if (data.msg=='duplicate') {
                    toast("Class Already Added!")
                }
                if (data.msg=='enrolled') {
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
            <div>
                <h1 className='text-3xl text-center my-5 text-red-600'> Total Class: {approvedClass?.length}</h1>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-5'>
                {
                    approvedClass?.map(a_class => <Roll key={a_class._id} direction='down'>

                        <div key={a_class._id} className={a_class.seats == 0 ? "card mx-1 min-h-[500px] bg-red-600 shadow-xl" : "card mx-1 bg-slate-50 shadow-xl min-h-[500px]"} >
                            <figure className='pt-10 px-10'><img src={a_class.class_image} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title text-black">{a_class.class}</h2>
                                <p className='text-black'>Instructor: {a_class.name}</p>
                                <p className='text-black'>Available Seats:{a_class.seats}</p>
                                <p className='text-black'>Total Student: {a_class.student}</p>
                                <p className='text-black'>Price:{a_class.price}$</p>
                                <div className="card-actions justify-end">
                                    <button onClick={() => { selectClass(a_class) }} disabled={isInstructor || isAdmin || a_class.seats == 0} className="btn border-none text-white hover:bg-[#ce1010] bg-[red] btn-sm ">Select</button>
                                </div>
                            </div>

                        </div>
                    </Roll>
                    )
                }
                <ToastContainer></ToastContainer>
            </div>

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

export default AllClass;