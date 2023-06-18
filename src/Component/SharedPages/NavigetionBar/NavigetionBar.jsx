import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png'
import { Authcontext } from '../../AuthProvider/AuthProvider';
import { Tooltip } from 'react-tooltip'
import useAdmin from '../../../Hooks/useAdmin';
import useInstructor from '../../../Hooks/useInstructor';
import './NavigetionBar.css'
import useStudent from '../../../Hooks/useStudent';
import { Slide} from "react-awesome-reveal";
const NavigetionBar = () => {
    const navigate=useNavigate()
    const { user,loader ,logoutUser } = useContext(Authcontext)
    console.log(loader)
const handleLogout=()=>{
    logoutUser()
    navigate('/')
}

const [isAdmin]=useAdmin();
const[isInstructor]=useInstructor()
const[isStudent]=useStudent()
console.log(isAdmin,isInstructor,isStudent)
const links = <>
<Slide direction='up'>
<NavLink   className={({ isActive }) => isActive ? " text-decoration-none  hover:duration-300 hover:underline hover:decoration-[red] hover:underline-offset-4 hover:-translate-y-1 mx-4 duration-300  activee" : "text-decoration-none duration-300  hover:duration-300 hover:underline hover:decoration-[red] hover:underline-offset-4 hover:-translate-y-1 mx-4"} to='/'>Home</NavLink>
<NavLink  className={({ isActive }) => isActive ? " text-decoration-none  hover:duration-300 hover:underline hover:decoration-[red] hover:underline-offset-4 hover:-translate-y-1 mx-4 duration-300  activee" : "text-decoration-none duration-300  hover:duration-300 hover:underline hover:decoration-[red] hover:underline-offset-4 hover:-translate-y-1 mx-4"} to='/allinstructor' >Instructors</NavLink>
<NavLink className={({ isActive }) => isActive ? " text-decoration-none  hover:duration-300 hover:underline hover:decoration-[red] hover:underline-offset-4 hover:-translate-y-1 mx-4 duration-300  activee" : "text-decoration-none duration-300  hover:duration-300 hover:underline hover:decoration-[red] hover:underline-offset-4 hover:-translate-y-1 mx-4"} to='/approvedclass'  > Classes</NavLink>

{
    user?.email && <>
    {
isAdmin ?       <NavLink to='/dashboard/alluser'  className={({ isActive }) => isActive ? " text-decoration-none  hover:duration-300 hover:underline hover:decoration-[red] hover:underline-offset-4 hover:-translate-y-1 mx-4 duration-300  activee" : "text-decoration-none duration-300  hover:duration-300 hover:underline hover:decoration-[red] hover:underline-offset-4 hover:-translate-y-1 mx-4"}>Dashboard</NavLink> : isInstructor ? <NavLink to='/dashboard/addclass'  className={({ isActive }) => isActive ? " text-decoration-none  hover:duration-300 hover:underline hover:decoration-[red] hover:underline-offset-4 hover:-translate-y-1 mx-4 duration-300  activee" : "text-decoration-none duration-300  hover:duration-300 hover:underline hover:decoration-[red] hover:underline-offset-4 hover:-translate-y-1 mx-4"}>Dashboard</NavLink>:      <NavLink to='/dashboard/selectedclass'  className={({ isActive }) => isActive ? " text-decoration-none  hover:duration-300 hover:underline hover:decoration-[red] hover:underline-offset-4 hover:-translate-y-1 mx-4 duration-300  activee" : "text-decoration-none duration-300  hover:duration-300 hover:underline hover:decoration-[red] hover:underline-offset-4 hover:-translate-y-1 mx-4"}>Dashboard</NavLink>
}
    </>
}
</Slide>
    
    </>


    return (
        <div className="navbar bg-slate-100 lg:px-10 rounded-lg">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 text-red-600 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 z-20 shadow bg-slate-100 text-black rounded-box w-52">
                        {links}
                    </ul>
                </div>
            <Slide><Link to='/'><img className='duration-300 hover:duration-300 hover:origin-top-left hover:rotate-12' src={logo} alt="" /></Link></Slide>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu text-black menu-horizontal px-1">
                  {links}
                </ul>
            </div>
            <div className="navbar-end">

<Slide direction='right'>
{
    user ?  <div className='flex'>
        <a  data-tooltip-id="my-tooltip"
                    data-tooltip-content={user?.displayName}data-tooltip-place="left"> <img className="mx-2" style={{height:'50px',objectFit:'cover' ,width: '50px', borderRadius: '50%' }} src={user?.photoURL} alt="" /> </a>
        <button onClick={handleLogout}  className="btn bg-[red]  border-none hover:duration-300 hover:scale-95 hover:bg-[#c01414] text-white">Logout</button>
        </div> :
  <Link to='/login' className="btn bg-[red]  border-none hover:duration-300 hover:scale-95 hover:bg-[#c01414] text-white">Login</Link>
}
</Slide>

<Tooltip id="my-tooltip" />        
            </div>
        </div>
    );
};

export default NavigetionBar;