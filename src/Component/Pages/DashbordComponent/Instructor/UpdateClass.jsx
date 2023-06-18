import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useTitle from '../../../../Hooks/useTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const UpdateClass = () => {
    useTitle('Capture Camp/Update Class')
    const id=useParams()

    const { register, handleSubmit, formState: { errors },reset } = useForm()
    const onSubmit = (data) => {
        console.log(data)
        const availableSeats=parseInt(parseFloat(data.availableSeats))
        const price= parseFloat(parseFloat(data.price).toFixed(2))
        const updatedData={availableSeats,price}
        fetch(`https://capture-camp-server.vercel.app/updateclass/${id?.data}`,{
            method:"PUT",
            headers:{
                'authorization':`Bearer ${localStorage.getItem('access-token')}`,
                'content-type':'application/json'
            },
            body:JSON.stringify(updatedData)
        })
        .then(res=>res.json())
        .then(data=>{console.log(data)
        if(data.modifiedCount>0){
            toast("Class Updated!")
        }
        })
    }
    return (
      <div className='mx-2'>
          <form onSubmit={handleSubmit(onSubmit)} action="">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Available Seats</span>
                </label>
                <input  {...register("availableSeats", { required: true })} type="number" name="availableSeats" className='placeholder-gray-400 input bg-slate-200' placeholder='Available Seats' />
                {errors.availableSeats && <span className="text-red-600">Available Seats is required</span>}
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Fee</span>
                </label>
                <input  {...register("price", { required: true })} type="text" name="price" className='placeholder-gray-400 input bg-slate-200' placeholder='Price' />
                {errors.price && <span className="text-red-600">Price is required</span>}
            </div>

            <div className="form-control mt-6">
                <input className="btn bg-[red] border-none hover:duration-300 hover:scale-95 hover:bg-[#c01414] text-white" type="submit" value="Update" />
            </div>
        </form>
        <ToastContainer></ToastContainer>
      </div>
    );
};

export default UpdateClass;


