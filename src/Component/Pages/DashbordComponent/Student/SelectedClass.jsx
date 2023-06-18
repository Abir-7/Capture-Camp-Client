import React, { useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useContext } from 'react';
import { Authcontext } from '../../../AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { Slide, Zoom } from "react-awesome-reveal"
import useTitle from '../../../../Hooks/useTitle';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'



const SelectedClass = () => {

  useTitle('Capture Camp/Selected Class')
  const { user, loader } = useContext(Authcontext)
  const [axiosSecure] = useAxiosSecure()
  const { data: selectedClass, isLoading, refetch } = useQuery({
    queryKey: ['selectedClass', user?.email],
    enabled: !loader,
    queryFn: async () => {
      const res = await axiosSecure.get(`/selectedclass?email=${user?.email}`);
      return res.data;
    }
  })


  /////modal 
  const [clasId, setClassId] = useState('')



  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = (id) => {
    console.log("Function executed!");

    axios.delete(`https://capture-camp-server.vercel.app/selectedclass/${id}`)
      .then(res => {
        if (res.data.deletedCount == 1) {
          refetch()
          toast("your Class Deleted")
        }
      })
    setClassId('')
    closeModal();
  };


  console.log(selectedClass)
  if (loader) {
    return <p>Loading.......</p>
  }



  return (
    <div>

      {
        selectedClass?.length === 0 && <p className='text-center text-xl mt-2 text-slate-900'>Noting to Show, Please select a class!!</p>
      }

      <div className='grid grid-cols-1 md:grid-cols-3 mx-5 mt-5'>

        {
          selectedClass?.map(a_class => <Slide key={a_class._id} direction='right'><div className="card min-h-[500px] mx-1 bg-slate-50 shadow-xl">
            <figure className='pt-10 px-10'><img src={a_class.class_image} alt="Shoes" /></figure>
            <div className="card-body">
              <h2 className="card-title text-slate-900">{a_class.className}</h2>
              <p className='text-slate-900'>Instructor: {a_class.name}</p>
              <p className='text-slate-900'>Available Seats: {a_class.seats}</p>
              <p className='text-slate-900'>Price:{a_class.price}$</p>
              <div className="card-actions  justify-end">
                <button onClick={() => {
                  setClassId(a_class._id)
                  openModal()
                }} className="btn border-none text-white hover:bg-[#ce1010] bg-[red] btn-sm ">Remove</button>
                <Link to={`/dashboard/payment/${a_class._id}`} className="btn border-none text-white hover:bg-[#ce1010] bg-[red] btn-sm ">Pay Now</Link>
              </div>
            </div>
          </div>
          </Slide>
          )
        }
        <ToastContainer></ToastContainer>
      </div>

      {isModalOpen && (

        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <p className="text-center">Are You Sure You Want To Delete?</p>
            <div className="flex justify-center mt-4">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => { handleConfirm(clasId) }}>Yes</button>
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={closeModal}>No</button>
            </div>
          </div>
        </div>

      )}

    </div>
  );
};

// onClick={()=>{removeClass(a_class._id)}}

export default SelectedClass;