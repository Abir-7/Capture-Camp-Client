import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/login.png'
import { useForm } from "react-hook-form";
import useTitle from '../../../Hooks/useTitle';
import { useContext, useState } from 'react';

import { Authcontext } from '../../AuthProvider/AuthProvider';
import { FaEye, FaGoogle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Signup = () => {
    const {  googleSignin } = useContext(Authcontext)
    useTitle('Capture Camp/Signup')
    const [show,setShow]=useState(false)
    const [c_show,setC_Show]=useState(false)
    const navigate=useNavigate()
    const { createUser, updateUserProfile, } = useContext(Authcontext)
    const [msg, setMsg] = useState('')
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = (data,event) => {
        event.preventDefault()
        setMsg('')

        if (data.password !== data.c_password) {
            return setMsg('Password Do not match')
        }

        createUser(data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                if (user) {
                    setMsg('Signup Successfull')
                }
                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email.toLowerCase(),role:'student', photo:data.photo }
                        fetch('https://capture-camp-server.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    setIsModalOpen(true)
                                    reset();
                                }
                            })
                    }).catch((error) => {
                        console.log(error)
                    });
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setMsg(errorMessage)
                // ..
            });


    }

    const handleGoogole = () => {
        setMsg('')
        googleSignin()
            .then((userCredential) => {
             
                const user = userCredential.user;
                console.log(user)

                const saveUser = { name: user?.displayName, email: user?.email,role:'student', photo:user?.photoURL }
                fetch('https://capture-camp-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            setIsModalOpen(true)
                         
                        }
                        else{
                            toast("Login successfully.")
                   
                            navigate('/')
                        }
                    })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setMsg(errorMessage)
            });
    }
   
    const showPassword=event=>{
        event.preventDefault()
        setShow(!show)
    }
    const showC_Password=event=>{
        event.preventDefault()
        setC_Show(!c_show)
    }

        /////////////////////////////////////////
        const [isModalOpen, setIsModalOpen] = useState(false);


        const handleConfirm = () => {
            setIsModalOpen(false)

            navigate('/')
        };
    








    return (
        <div className='text-center my-2 bg-slate-100 pt-8 '>
            <h1 className='text-[red] font-serif text-5xl lg:text-7xl'>Signup Here</h1>
            <div className=" hero mt-5 min-h-[80vh] bg-slate-100">
                <div className="hero-content flex-col-reverse lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <img width={'500px'} src={logo} alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-state-100">

                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <div className="card-body">

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input {...register("name", { required: true })} type="text" name="name" id="" className='placeholder-gray-400 input bg-slate-200' placeholder='Name' />
                                    {errors.name && <span className="text-red-600">Name is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input {...register("email", { required: true })} type="email" name="email" className='placeholder-gray-400 input bg-slate-200' placeholder='Email' />
                                    {errors.email && <span className="text-red-600">Email is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo Url</span>
                                    </label>
                                    <input {...register("photo", { required: true })} type="text" name="photo" className='placeholder-gray-400 input bg-slate-200' placeholder='Photo Url' />
                                    {errors.photo && <span className="text-red-600">Photo Url is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>

                               <div>
                               <input  {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })} type={show ? "text":"password"} name="password" className='placeholder-gray-400 input w-full bg-slate-200' placeholder='Password' />
                                    <button onClick={showPassword} className="btn btn-xs btn-ghost hover:bg-transparent my-2 w-1/5 mx-auto absolute right-7 mt-3" ><FaEye></FaEye></button>
                               </div>
                                    {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                    {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                    {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                    {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}


                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Confirm Password</span>
                                    </label>
                                    {/* Password Velidation */}
                               <div>
                               <input {...register("c_password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })} type={c_show ? "text":"password"} name="c_password" className='w-full placeholder-gray-400 input bg-slate-200' placeholder='Confirm Password' />
                                    <button onClick={showC_Password} className="btn btn-xs btn-ghost hover:bg-transparent my-2 w-1/5 mx-auto absolute right-7 mt-3" ><FaEye></FaEye></button>
                               </div>
                                    {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                    {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                    {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                    {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}

                                    {/* Password Velidation End */}
                                </div>
                                <div className="form-control mt-6">
                                    <input className='btn bg-[red] border-none hover:duration-300 hover:scale-95 hover:bg-[#c01414] text-white' type="submit" value="Signup" />
                                </div>
                               
                            </div>
                        </form>
                        <hr className='mb-3' />
                                <button   onClick={handleGoogole}   className="btn border-[red] mx-auto btn-circle btn-outline hover:bg-[red] hover:text-white text-black bg-[white] ">
                                <FaGoogle className='m-2 text-[red] hover:text-white'></FaGoogle>
                                </button>
                                <label className="label">
                                    <p className="label-text-alt mb-3 mx-auto ">Allready have an account?? <span className='link link-hover'><Link to='/login' className='text-[red]'>Click Here</Link></span> </p>

                                </label>
                                {
                                    <p className='text-warning text-center'>{msg}</p>
                                }
                    </div>

                </div>
            </div>
            {isModalOpen && (

<div className="fixed  inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-md">
        <p className="text-center">User Created Succesfully</p>
        <div className="flex justify-center mt-4">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => { handleConfirm() }}>Ok</button>

        </div>
    </div>
</div>

)}
        </div>

    );
};

export default Signup;









// import { Link, useNavigate } from 'react-router-dom';
// import logo from '../../../assets/login.png'
// import { useForm } from "react-hook-form";
// import useTitle from '../../../Hooks/useTitle';
// import { useContext, useState } from 'react';
// import Swal from 'sweetalert2';
// import { Authcontext } from '../../AuthProvider/AuthProvider';
// import axios from 'axios';


// const Signup = () => {
//     const[active,setActive]=useState(false)
//     useTitle('Capture Camp/Signup')
//     const navigate = useNavigate()

//     const img_token = import.meta.env.VITE_Image_Key;
//     const img_hosting_url = `http://api.imgbb.com/1/upload?key=${img_token}`

//     const { createUser, updateUserProfile, } = useContext(Authcontext)
//     const [msg, setMsg] = useState('')
//     const { register, handleSubmit, reset, formState: { errors } } = useForm();

//     const onSubmit = (data) => {

//         console.log(data)
//         setActive(true)
//         setMsg('')
//         if (data.password !== data.c_password) {
//             setActive(false)
//          return setMsg('Password Do not match')
//         }
//         const formData = new FormData();
//         formData.append('image', data.image[0])

//         axios.post(img_hosting_url, formData,)
//     //  .then(res =>(res.data.data.display_url))
//             .then(res => {
//                 console.log(res.data.data)
//                 if (res.data.data.id) {
//                     const imgURL = res.data.data.display_url
//                     createUser(data.email, data.password)
//                     .then((userCredential) => {
//                         const user = userCredential.user;
//                         console.log(user)
//                         if (user) {
//                             setMsg('Signup Successfull')
//                         }
//                         updateUserProfile(data.name,imgURL)
//                             .then(() => {
//                                 const saveUser = { name: data.name, email: data.email.toLowerCase(), role: 'student', photo: imgURL }
//                                 fetch('https://capture-camp-server.vercel.app/users', {
//                                     method: 'POST',
//                                     headers: {
//                                         'content-type': 'application/json'
//                                     },
//                                     body: JSON.stringify(saveUser)
//                                 })
//                                     .then(res => res.json())
//                                     .then(data => {
//                                         if (data.insertedId) {
//                                             reset();
//                                             Swal.fire({
//                                                 position: 'center',
//                                                 icon: 'success',
//                                                 title: 'User created successfully.',
//                                                 showConfirmButton: false,
//                                                 timer: 1500
//                                             });
//                                             setActive(false)
//                                             navigate('/');
                                           
//                                         }
//                                     })
//                             }).catch((error) => {
//                                 console.log(error)
//                             });
//                         // ...
//                     })
//                     .catch((error) => {
//                         const errorCode = error.code;
//                         const errorMessage = error.message;
//                         setMsg(errorMessage)
//                         setActive(false)
//                         // ..
//                     });
//                 }

//             })
//             .catch(error => {
//                 console.log(error);
//                 // Handle the error here
//               })

//     }





//     return (
//         <div className='text-center my-2 bg-slate-100 pt-8 '>
//             <h1 className='text-[red] font-serif text-5xl lg:text-7xl'>Signup Here</h1>
//             <div className=" hero mt-5 min-h-[80vh] bg-slate-100">
//                 <div className="hero-content flex-col-reverse lg:flex-row-reverse">
//                     <div className="text-center lg:text-left">
//                         <img width={'500px'} src={logo} alt="" />
//                     </div>
//                     <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-state-100">

//                         <form action="" onSubmit={handleSubmit(onSubmit)}>
//                             <div className="card-body">

//                                 <div className="form-control">
//                                     <label className="label">
//                                         <span className="label-text">Name</span>
//                                     </label>
//                                     <input {...register("name", { required: true })} type="text" name="name" id="" className='placeholder-gray-400 input bg-slate-200' placeholder='Name' />
//                                     {errors.name && <span className="text-red-600">Name is required</span>}
//                                 </div>
//                                 <div className="form-control">
//                                     <label className="label">
//                                         <span className="label-text">Email</span>
//                                     </label>
//                                     <input {...register("email", { required: true })} type="email" name="email" className='placeholder-gray-400 input bg-slate-200' placeholder='Email' />
//                                     {errors.email && <span className="text-red-600">Email is required</span>}
//                                 </div>
//                                 <div className="form-control">
//                                     <label className="label">
//                                         <span className="label-text">Image</span>
//                                     </label>
//                                     <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full " />
//                                     {errors.image && <span className="text-red-600">Image is required</span>}
//                                 </div>
//                                 <div className="form-control">
//                                     <label className="label">
//                                         <span className="label-text">Password</span>
//                                     </label>

//                                     <input {...register("password", {
//                                         required: true,
//                                         minLength: 6,
//                                         maxLength: 20,
//                                         pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
//                                     })} type="password" name="password" className='placeholder-gray-400 input bg-slate-200' placeholder='Password' />

//                                     {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
//                                     {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
//                                     {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
//                                     {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}


//                                 </div>
//                                 <div className="form-control">
//                                     <label className="label">
//                                         <span className="label-text">Confirm Password</span>
//                                     </label>
//                                     <input {...register("c_password", {required: true})} type="password" name="c_password" className='placeholder-gray-400 input bg-slate-200' placeholder='Confirm Password' />
//                                     {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
//                                 </div>

//                                 <div className="form-control mt-6">
//                                     <input className='btn bg-[red] border-none hover:duration-300 hover:scale-95 hover:bg-[#c01414] text-white' type="submit" value="Signup" />
//                                 </div>
//                                 <label className="label">
//                                     <p className="label-text-alt ">Allready have an account?? <span className='link link-hover'><Link to='/login' className='text-[red]'>Click Here</Link></span> </p>

//                                 </label>
//                                 {
//                                     <p className='text-warning'>{msg}</p>
//                                 }
//                             </div>
//                         </form>
//                     </div>

//                 </div>
//             </div>
//         </div>

//     );
// };

// export default Signup;
// // disabled={active} 