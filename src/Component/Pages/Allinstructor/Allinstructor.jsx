import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Slide } from "react-awesome-reveal"
import useTitle from '../../../Hooks/useTitle';
const Allinstructor = () => {
    useTitle('Capture Camp/Instructors')
    const [axiosSecure] = useAxiosSecure()
    const { data: allinstructor, isLoading } = useQuery({
        queryKey: ['allInstruction',],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/allinstructor`);
            return res.data;
        }
    })
    return (
        <div className='my-2'>
            {
                console.log(allinstructor)
            }
            <div>
                <h1 className='text-3xl text-center my-5 text-red-600'> Total Instructor: {allinstructor?.length}</h1>
            </div>

            <div className="overflow-x-auto">
                <table className="table bg-slate-100 text-black">
                    {/* head */}
                    <thead>
                        <tr>

                            <th className='text-[red]'>Photo</th>
                            <th className='text-[red]'>Name</th>
                            <th className='text-[red]'>Email</th>
                            <th className='text-[red]'>Classes taken by the Instructor</th>
                            <th className='text-[red]'>Class Name</th>
                        </tr>
                    </thead>
                    <tbody className='text-slate-900'>
                        {/* row 1 */}
                        {
                            allinstructor?.map(instructor => <tr key={instructor._id}>

                                <td>
                                    <div className="avatar">
                                        <Slide direction='left'>
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={instructor.photo} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </Slide>
                                    </div>

                                </td>
                                <td>
                                    <Slide direction='right'>
                                        {instructor.name}
                                    </Slide>
                                </td>
                                <td>
                                    <Slide direction='left'>
                                        {instructor.email}
                                    </Slide>
                                </td>
                                <td>
                                    <Slide direction='right'>
                                        {instructor.numClasses}
                                    </Slide>
                                </td>
                                <td>
                                    <Slide direction='left'>
                                        {
                                            instructor.classNames.map((clas, index) => <p key={index}>{clas}</p>)
                                        }
                                    </Slide>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default Allinstructor;