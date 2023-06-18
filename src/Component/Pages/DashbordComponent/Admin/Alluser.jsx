import React, { useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

import useTitle from '../../../../Hooks/useTitle';
import { Slide} from "react-awesome-reveal";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const Alluser = () => {
    useTitle('Capture Camp/All Users')
    const [axiosSecure] = useAxiosSecure()
    const { data: alluser = [], isLoading, refetch } = useQuery({
        queryKey: ['alluser',],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            console.log(res.data)
            return res.data;
        }
    })


    const makeAdmin = (user) => {

        fetch(`https://capture-camp-server.vercel.app/users/makeadmin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch();

                    toast(`${user.name} is an Admin Now!`)
                }
            })
    }

    const makeInstructor = (user) => {

        fetch(`https://capture-camp-server.vercel.app/users/makeinstuctor/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch();
                    toast(`${user.name} is an Instructor Now!`)
                }
            })
    }


    return (

        <>
            <div>
                <h1 className='text-3xl text-center my-5 text-red-600'> Total User: {alluser?.length}</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-100">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className='text-[red]'>Photo</th>
                            <th className='text-[red]'>Name</th>
                            <th className='text-[red]'>Email</th>
                            <th className='text-[red]'>Role</th>
                            <th className='text-[red]'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-slate-900'>
                        {
                            alluser?.map(user => {
                                return <tr key={user._id}>

                                    <td>
                                    <Slide direction='right'>
                                    <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.photo} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </Slide>

                                    </td>
                                    <td>
                                      <Slide>
                                      {user.name}
                                      </Slide>
                                    </td>
                                    <td>
                                       <Slide direction='right'>{user.email}</Slide>
                                    </td>
                                    <td>
                                       <Slide>{user.role}</Slide>
                                    </td>

                                    <td>
                                   <Slide direction='right'>
                                   <div className='grid gap-4'>
                                            <button onClick={() => { makeAdmin(user) }} disabled={user.role === 'admin'} className='btn bg-[red] hover:bg-[#c50505] border-none btn-sm text-white'>Make Admin</button>
                                            <button onClick={() => { makeInstructor(user) }} disabled={user.role === 'instructor'} className='btn bg-[red] hover:bg-[#c50505]  border-none  btn-sm text-white'>Make Instructor</button>
                                        </div>
                                   </Slide>
                                    </td>

                                </tr>
                            })
                        }
                    </tbody>



                </table>
                <ToastContainer></ToastContainer>
            </div>

        </>


    );
};

export default Alluser;


