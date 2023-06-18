import React, { useContext } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Authcontext } from '../../../AuthProvider/AuthProvider';
import { Slide } from "react-awesome-reveal"
import useTitle from '../../../../Hooks/useTitle';
import moment from 'moment/moment';

const PaymentHistory = () => {
    useTitle('Capture Camp/Payment History')
    const { user, loader } = useContext(Authcontext)
    const [axiosSecure] = useAxiosSecure()
    const { data: paymentHistory, isLoading } = useQuery({
        queryKey: ['paymenthistory', user?.email],
        enabled: !loader,
        queryFn: async () => {
            const res = await axiosSecure.get(`/paymenthistory?email=${user?.email}`);
            return res.data;
        }
    })
    console.log(user?.email)
    console.log(paymentHistory)
    return (

            <div className='my-2 mx-2'>

                <div className="overflow-x-auto">
                    <table className="table bg-slate-100 text-black">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className='text-[red]'>Class Name</th>
                                <th className='text-[red]'>Instuctor</th>
                                <th className='text-[red]'>Price</th>
                                <th className='text-[red]'>Transaction Id</th>
                                <th className='text-[red]'>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                paymentHistory?.map(payment => <tr key={payment._id}>
                                    <td>
                                      <Slide>{payment.className}</Slide>
                                    </td>
                                    <td>
                                       <Slide direction='right'>{payment.instructor_name}</Slide>
                                    </td>
                                    <td>
                                        <Slide><>{payment.price}$</></Slide>
                                    </td>
                                    <td>
                                       <Slide direction='right'>{payment.trasectionID}</Slide>
                                    </td>
                                    <td>
                                        <Slide>{moment(payment.date).format('MMMM Do YYYY, h:mm:ss a')}</Slide>

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

export default PaymentHistory;