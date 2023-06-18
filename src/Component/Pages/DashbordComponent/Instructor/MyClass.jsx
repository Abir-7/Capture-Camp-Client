import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useContext } from 'react';
import { Authcontext } from '../../../AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useTitle from '../../../../Hooks/useTitle';
import { Roll } from "react-awesome-reveal"
const MyClass = () => {
  useTitle('Capture Camp/My Class')
  const { user, loader } = useContext(Authcontext)
  const [axiosSecure] = useAxiosSecure()
  const { data: myclass = [], isLoading, refetch } = useQuery({
    queryKey: ['myClass', user?.email],
    enabled: !loader,
    queryFn: async () => {
      const res = await axiosSecure.get(`/class?email=${user?.email}`);
      console.log(res.data)
      return res.data;
    }
  })
  console.log(myclass)
  return (
    <div className="overflow-x-auto mx-2">
      <table className="table w-100">
        {/* head */}
        <thead>
          <tr>
            <th className='text-[red]'>Photo</th>
            <th className='text-[red]'>Class Name</th>
            <th className='text-[red]'>Total Seats</th>
            <th className='text-[red]'>Total Student</th>
            <th className='text-[red]'>Price</th>
            <th className='text-[red]'>Status</th>
            <th className='text-[red]'>Feedback</th>
            <th className='text-[red]'>Action</th>
          </tr>
        </thead>
        <tbody className='text-slate-900'>
          {
            myclass?.map(clas => {
              return <tr key={clas._id}>

                <td>
                <Roll>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={clas?.class_image} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  </Roll>
                </td>
                <td>
                  <Roll direction='right'>{clas?.class}</Roll>
                </td>
                <td>
                  <Roll>{clas?.seats}</Roll>
                </td>
                <td>
                  <Roll direction='right'>{clas?.student}</Roll>
                </td>
                <td>
                  <Roll><>{clas?.price} $</></Roll>
                </td>

                <td>
                  <Roll direction='right'>{clas?.status}</Roll>
                </td>
                <td>
                  <Roll>{clas?.feedback}</Roll>
                </td>
                <td>
                 <Roll direction='right'><Link to={`/dashboard/updateclass/${clas._id}`} className='btn bg-[red] hover:bg-[#c50505]  border-none  btn-sm text-white'>Update</Link></Roll>
                </td>

              </tr>
            })
          }
        </tbody>



      </table>
    </div>
  );
};

export default MyClass;

