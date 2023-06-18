import React, { useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { Authcontext } from '../../../AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import useTitle from '../../../../Hooks/useTitle';
import { Slide} from "react-awesome-reveal";
const ManageClass = () => {
  useTitle('Capture Camp/Manage Classes')
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [userid, setUserId] = useState('');



  const handleCloseModal = () => {
    setShowModal(false);
    setFeedback('');
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmitFeedback = () => {
    // Perform logic to submit feedback
    console.log('Feedback:', feedback, userid);

    fetch(`https://capture-camp-server.vercel.app/allclass/${userid}?feedback=${feedback}`, {
      method: 'PATCH',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('access-token')}`,
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.modifiedCount) {
          refetch();
          toast("Feedback Sent")
        }
      })

    // Clear the feedback input
    setFeedback('');
    setUserId('')
    // Close the modal
    setShowModal(false);
  };



  ////////////////////////////////
  const [axiosSecure] = useAxiosSecure()
  const { loader } = useContext(Authcontext)
  const { data: allclass, refetch } = useQuery({
    queryKey: ['manageClass'],
    enabled: !loader,
    queryFn: async () => {
      const res = await axiosSecure.get(`/allclass`);
      return res.data;
    }
  })

  console.log(allclass)

  const approveClass = (id, sts) => {
    fetch(`https://capture-camp-server.vercel.app/allclass/${id}?sts=${sts}`, {
      method: 'PATCH',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('access-token')}`,
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.modifiedCount) {
          refetch();
          toast(`Class ${sts}`)
        
        }
      })
  }


  return (

    <div className="overflow-x-auto">
      <table className="table w-100">
        {/* head */}
        <thead>
          <tr>
            <th className='text-[red]'>Photo</th>
            <th className='text-[red]'>Class Name</th>
            <th className='text-[red]'>Instructor Name</th>
            <th className='text-[red]'>Instructor Email</th>
            <th className='text-[red]'>Available Seats</th>
            <th className='text-[red]'>Price</th>
            <th className='text-[red]'>Status</th>
          </tr>
        </thead>
        <tbody className='text-slate-900'>
          {
            allclass?.map(clas => {
              return <tr key={clas._id}>

                <td>
                  <Slide>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={clas?.class_image} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                  </Slide>

                </td>
                <td>
                  <Slide direction='right'>{clas?.class}</Slide>
                </td>
                <td>
                  <Slide>{clas?.name}</Slide>
                </td>
                <td>
                  <Slide direction='right'>{clas?.email}</Slide>
                </td>
                <td>
                  <Slide>{clas?.seats}</Slide>
                </td>

                <td>
                  <Slide direction='right'><>{clas?.price} $</></Slide>
                </td>
                <td>
                  <Slide>{clas?.status}</Slide>
                </td>
                <td>
                  <Slide direction='right'>
                    <div className='grid gap-4'>
                      <button onClick={() => { approveClass(clas._id, 'accepted') }} disabled={clas?.status !== 'pending'} className='btn bg-[red] hover:bg-[#c50505]  border-none  btn-sm text-white'>Approve</button>
                      <button onClick={() => { approveClass(clas._id, 'denied') }} disabled={clas?.status !== 'pending'} className='btn bg-[red] hover:bg-[#c50505]  border-none  btn-sm text-white'>Denied</button>
                      <button onClick={() => { setShowModal(!showModal); setUserId(clas._id) }} className='btn bg-[red] hover:bg-[#c50505]  border-none  btn-sm text-white'>Feedback</button>
                    </div>
                  </Slide>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm mx-auto rounded-lg shadow-lg">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Provide Feedback</h2>
              <input
                type="text"
                value={feedback}
                onChange={handleFeedbackChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
                placeholder="Enter your feedback"
              />
              <div className="flex gap-4 justify-end">
                <button
                  onClick={handleSubmitFeedback}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                >
                  Submit
                </button>
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
         <ToastContainer></ToastContainer>
    </div>

  );
};

export default ManageClass;