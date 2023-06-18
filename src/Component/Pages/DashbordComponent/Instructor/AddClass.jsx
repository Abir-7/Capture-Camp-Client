import React, { useContext, useState } from 'react';
import { Authcontext } from '../../../AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import useTitle from '../../../../Hooks/useTitle';
import { Slide } from "react-awesome-reveal"
const AddClass = () => {
    useTitle('Capture Camp/Add Class')
    const [active, setActive] = useState(false)
    const { user } = useContext(Authcontext)
    console.log(user)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [axiosSecure] = useAxiosSecure();
    const img_token = import.meta.env.VITE_Image_Key;
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_token}`

    const onSubmit = (data) => {
        setActive(true)
        const formData = new FormData();
        formData.append('image', data.image[0])
        console.log(formData)
        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const newClass = { name: data.name, email: data.email, class: data.className, class_image: imgURL, seats: parseInt(data.availableSeats), price: parseFloat(parseFloat(data.price).toFixed(2)), status: 'pending', student: parseInt('0') }
                    console.log(newClass)
                    axiosSecure.post('/class', newClass)
                        .then(data => {
                            if (data.data.insertedId) {
                                reset();
                                toast("Class Added")
                                setActive(false)
                            }
                        })

                }
            })

    }

    return (
        <div className='my-2 mx-2'>
            <form onSubmit={handleSubmit(onSubmit)} action="">
                <Slide>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-slate-900">Class Name</span>
                        </label>
                        <input  {...register("className", { required: true })} type="text" name="className" className='placeholder-gray-400 input bg-slate-200' placeholder='Class Name' />
                        {errors.className && <span className="text-red-600">Class Name is required</span>}
                    </div>
                </Slide>
                <Slide direction='right'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-slate-900">Image</span>
                        </label>
                        <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full " />
                        {errors.image && <span className="text-red-600">Image is required</span>}
                    </div>
                </Slide>
                <Slide>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-slate-900">Instructor Name</span>
                        </label>
                        <input  {...register("name", { required: true })} type="text" defaultValue={user?.displayName} name="name" className='text-[red] placeholder-gray-400 input bg-slate-200' placeholder='Instructor Name' />
                        {errors.name && <span className="text-red-600">Name is required</span>}
                    </div>
                </Slide>
                <Slide direction='right'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-slate-900">Instructor Email</span>
                        </label>
                        <input  {...register("email", { required: true })} type="email" defaultValue={user?.email} name="email" className='text-[red] placeholder-gray-400 input bg-slate-200' placeholder='Instructor Email' />
                        {errors.Name && <span className="text-red-600">Email is required</span>}
                    </div>
                </Slide>Slide
                <Slide>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-slate-900">Available Seats</span>
                        </label>
                        <input  {...register("availableSeats", { required: true })} type="number" name="availableSeats" className='placeholder-gray-400 input bg-slate-200' placeholder='Available Seats' />
                        {errors.availableSeats && <span className="text-red-600">Available Seats is required</span>}
                    </div>
                </Slide>
                <Slide direction='right'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-slate-900">Fee</span>
                        </label>
                        <input  {...register("price", { required: true })} type="text" name="price" className='placeholder-gray-400 input bg-slate-200' placeholder='Price' />
                        {errors.price && <span className="text-red-600">Price is required</span>}
                    </div>
                </Slide>

                <Slide>
                    <div className="form-control mt-6">
                        <input disabled={active} className="btn bg-[red] border-none hover:duration-300 hover:scale-95 hover:bg-[#c01414] text-white" type="submit" value="Add" />
                    </div>
                </Slide>
            </form>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default AddClass;