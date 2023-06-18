import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Authcontext } from "../../../AuthProvider/AuthProvider";

import { useNavigate } from "react-router-dom";



const Checkout = ({ price, data }) => {
    const navigate = useNavigate()
    const [errMsg, setErrMsg] = useState('')
    const [msg, setMsg] = useState('')
    const { user } = useContext(Authcontext)
    const stripe = useStripe();
    const elements = useElements();
    const [axiosSecure] = useAxiosSecure()
    const [clientSecret, setClientSecret] = useState('');
    const [trasectionID, setTrasectionID] = useState('')
    const [paymentProcess, setPaymentProcess] = useState(false)
    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [price, axiosSecure])

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
        setErrMsg('')
        setMsg('')
        setPaymentProcess(true)

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setErrMsg(error.message)

            console.log('[error]', error);

        } else {
            setErrMsg('')
            console.log('[PaymentMethod]', paymentMethod);
        }

        const { paymentIntent, error: c_err } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'unknown',
                        email: user?.email || 'unknown',
                    },
                },
            },
        )

        if (c_err) {
            setErrMsg(c_err.message)
        }



        setPaymentProcess(false)
        if (paymentIntent?.status === 'succeeded') {
            const trasectionID = paymentIntent?.id
            setTrasectionID(trasectionID)

            const payment = {
                email: user.email, trasectionID: trasectionID, price, selected_class_id: data._id, class_id: data.class_id, className: data.className, instructor_name: data.name, date: new Date()
            }

            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data);
                    if (res.data.result.insertedId) {
                        setIsModalOpen(true)
                       
                    }
                })
        }
    }



    /////////////////////////////////////////
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleConfirm = () => {
        setIsModalOpen(false)
        navigate('/dashboard/selectedclass')
    };








    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    className="border border-gray-800 p-3 rounded-lg"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-outline border hover:border-none hover:text-white hover:bg-red-600 border-gray-800 btn-sm mt-4 " type="submit" disabled={!stripe || !clientSecret || paymentProcess}>
                    Pay
                </button>
            </form>

            {/* ///////////////////////////////////// */}

            {isModalOpen && (

                <div className="fixed  inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md">
                        <p className="text-center">Payment Succesfull</p>
                        <div className="flex justify-center mt-4">
                            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => { handleConfirm() }}>Ok</button>

                        </div>
                    </div>
                </div>

            )}
            {/* ////////////////////////// */}

            <p className="text-center text-red-600">{errMsg}</p>
            <p className="text-center text-green-600">{msg}</p>




        </div>
    );
};

export default Checkout;

