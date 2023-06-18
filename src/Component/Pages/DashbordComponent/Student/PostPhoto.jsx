import React, { useContext, useState } from 'react';
import useTitle from '../../../../Hooks/useTitle';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Authcontext } from '../../../AuthProvider/AuthProvider';
import { Roll, Slide } from 'react-awesome-reveal';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';



const PostPhoto = () => {

    useTitle('Capture Camp/Post Photo')
    const { user, loader } = useContext(Authcontext)
    const [axiosSecure] = useAxiosSecure()
    const { data: enrolledClass, isLoading } = useQuery({
        queryKey: ['enrolledClass', user?.email],
        enabled: !loader,
        queryFn: async () => {
            const res = await axiosSecure.get(`/enrolledclass?email=${user?.email}`);
            return res.data;
        }
    })
    console.log(enrolledClass)


    //get photos
    const { data: photos,refetch, isLoading:p_loading } = useQuery({
        queryKey: ['photosbyStudent', user?.email],
        enabled:!loader,
        queryFn: async () => {
            const res = await axiosSecure.get(`/photos?email=${user?.email}`);
            return res.data;
        }
    })

console.log(photos)
    ///post photo
    const [active, setActive] = useState(false)

    const { register, handleSubmit, formState: { errors }, reset } = useForm()

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
                    const photo = {photo:imgURL,email:user.email,name:user.displayName}
                    axiosSecure.post('/photos', photo)
                        .then(data => {
                            if (data.data.insertedId) {
                                reset();
                                refetch()
                                toast("Photo Added")
                                setActive(false)
                            }
                        })

                }
            })

    }


    return (
       <>
        <div className='my-2 mx-2'>
            <form onSubmit={handleSubmit(onSubmit)} action="">

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
                    <div className="form-control mt-6">
                        <input disabled={active || !enrolledClass } className="btn bg-[red] border-none hover:duration-300 hover:scale-95 hover:bg-[#c01414] text-white" type="submit" value="Add" />
                    </div>
            {
                !enrolledClass && <p className='text-red-600 text-center my-4'>You Have to Enroll a Class First</p>
            }
                </Slide>
            </form>
            <ToastContainer></ToastContainer>
        
        </div>
     
        <div>
            <hr  className=' mt-5'/>
            <h1 className='text-center text-2xl text-red-600  my-2'>Your Photos</h1>
            <hr className='w-[200px] mx-auto mb-4'/>

           <div className='flex justify-center'> 
           <div className='grid mx-2 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
                {
                   photos?.map(photo => <Roll key={photo._id} direction='down'>

                        <div className='w-[300px]' >
                            <figure className='card-body'><img src={photo.photo} alt="photo" /></figure>

                        </div>
                    </Roll>
                    )
                }
              
            </div>
           </div>

        </div>

       </>
    );
};

export default PostPhoto;