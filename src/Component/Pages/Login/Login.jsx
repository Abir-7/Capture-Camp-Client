
import logo from '../../../assets/login.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEye, FaGoogle } from 'react-icons/fa';
import { useContext, useState } from 'react';

import useTitle from '../../../Hooks/useTitle';
import { useForm } from "react-hook-form";
import { Authcontext } from '../../AuthProvider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
    const { user, loginUser, googleSignin } = useContext(Authcontext)
    const [show, setShow] = useState(false)
    useTitle('Capture Camp/Login')

    const [sts, setSts] = useState('')
    const navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        setSts('')
        loginUser(data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                toast("Signin Successfull")

                navigate(from, { replace: true })
            }).catch((error) => {

                const errorMessage = error.message
                console.log(error, errorMessage)
                setSts(errorMessage)
            });
    }


    const showPassword = event => {
        event.preventDefault()
        setShow(!show)
    }

    const handleGoogole = () => {
        setSts('')
        googleSignin()
            .then((userCredential) => {

                const user = userCredential.user;
                console.log(user)

                const saveUser = { name: user?.displayName, email: user?.email, role: 'student', photo: user?.photoURL }
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
                        else {
                            toast("Login successfully.")
                            navigate(from, { replace: true })
                        }
                    })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setSts(errorMessage)
            });
    }



    /////////////////////////////////////////
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleConfirm = () => {
        setIsModalOpen(false)

        navigate(from, { replace: true })
    };

    return (
        <div className='text-center bg-slate-100 my-2 pt-8 '>
            <h1 className='text-[red] font-serif text-5xl lg:text-7xl'>Login Here</h1>
            <div className=" hero  min-h-[75vh] bg-slate-100">
                <div className="hero-content flex-col-reverse lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <img width={'500px'} src={logo} alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-state-100">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)} action="">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input  {...register("email", { required: true })} type="email" name="email" className='placeholder-gray-400 input bg-slate-200' placeholder='Email' />
                                    {errors.email && <span className="text-red-600">Email is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <div>
                                        <input {...register("password", { required: true })} type={show ? "text" : "password"} name="password" className='w-full placeholder-gray-400 input bg-slate-200' placeholder='Password' />
                                        <button onClick={showPassword} className="btn btn-xs btn-ghost hover:bg-transparent my-2 w-1/5 mx-auto absolute right-7 mt-3" ><FaEye></FaEye></button>
                                    </div>

                                    {errors.email && <span className="text-red-600">Password is required</span>}
                                </div>
                                <div className="form-control mt-6">
                                    <input className="btn bg-[red] border-none hover:duration-300 hover:scale-95 hover:bg-[#c01414] text-white" type="submit" value="Login" />
                                </div>
                            </form>
                            <div className='mt-5'>
                                <hr />
                            </div>
                            <button onClick={handleGoogole} className="btn border-[red] mx-auto btn-circle btn-outline hover:bg-[red] hover:text-white text-black bg-[white] ">
                                <FaGoogle className='m-2 text-[red] hover:text-white'></FaGoogle>
                            </button>
                            <label className="label">
                                <p href="#" className="label-text-alt ">Don't have an account?? <span className='link link-hover'><Link to='/signup' className='text-[red]'>Click Here</Link></span> </p>
                            </label>
                            <p className='text-yellow-500'>{sts}</p>
                        </div>
                    </div>
                </div>
                <ToastContainer></ToastContainer>
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

export default Login;