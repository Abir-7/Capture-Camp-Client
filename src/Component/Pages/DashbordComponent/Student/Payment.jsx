
import Checkout from './Checkout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';

import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

import { useQuery } from '@tanstack/react-query';
import useTitle from '../../../../Hooks/useTitle';

import { Slide } from "react-awesome-reveal"

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_Pkey)

const Payment = () => {
    useTitle('Capture Camp/Payment')
    const id = useParams()
    const [axiosSecure] = useAxiosSecure()
    console.log(id.id)


    const { data: data, isLoading } = useQuery({
        queryKey: ['payClass', id.id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/selectedclass/${id.id}`);
            return res.data;
        }
    })

    const price = parseFloat(parseFloat(data?.price).toFixed(2))
    console.log(price)
    if (isLoading) {
        return <p>Loading.....</p>
    }

    return (
        <>
            <div className='max-w-[600px] mx-auto p-4'>
                <Slide direction='right'>

                    <div className='my-5 flex justify-center'>
                        <div className="card max-w-[400px] mx-1 bg-slate-50 shadow-xl">
                            <figure className='pt-10 px-10'><img src={data?.class_image} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{data?.className}</h2>
                                <p>Instructor: {data?.name}</p>
                                <p>Price:{data?.price}$</p>
                            </div>
                        </div>
                    </div>

                </Slide>

                <div className='text-center text-xl text-[red] mb-5'>Pay Now</div>
                <Elements stripe={stripePromise}>
                    <Checkout data={data} price={price}></Checkout>
                </Elements>
            </div>
        </>
    );
};

export default Payment;