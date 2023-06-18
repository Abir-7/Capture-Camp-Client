import { FaArrowRight, FaCheckCircle, FaMoneyBillAlt, FaPlus, FaCheck, FaUsers, FaStream,FaArrowCircleRight, FaHome, FaImage } from 'react-icons/fa'
import { Slide } from "react-awesome-reveal"
import 'animate.css'

import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../../Hooks/useAdmin';
import useInstructor from '../../Hooks/useInstructor';
import NavigetionBar from '../SharedPages/NavigetionBar/NavigetionBar';
import Footer from '../SharedPages/Footer/Footer';
import './Dashboard.css'
import useStudent from '../../Hooks/useStudent';

const Dashboard = () => {
  const [isAdmin] = useAdmin()
  const [isInstructor] = useInstructor()
  const [isStudent] = useStudent()
  console.log(isAdmin, isInstructor, isStudent)


  return (
    <>
      <NavigetionBar></NavigetionBar>
      <div className="drawer lg:drawer-open my-2">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content items-center overflow-x-auto  ">
          {/* Page content here */}


          <label htmlFor="my-drawer-2" className="btn bg-[red] text-white border-none btn-sm btn-[red] drawer-button lg:hidden"><FaArrowCircleRight/></label>
          <div >
            <Outlet></Outlet>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-slate-100 text-base-content">

            {/* Sidebar content here */}


            {
              isAdmin && <> <NavLink className={({ isActive }) => isActive ? " text-decoration-none text-lg mx-10 active " : "text-decoration-none text-slate-900 text-lg mx-10 "} to='/dashboard/alluser'><Slide><p className='flex items-center gap-3'><FaUsers /> All User</p></Slide></NavLink>
                <NavLink className={({ isActive }) => isActive ? "  text-decoration-none text-lg mx-10 active " : " text-decoration-none text-slate-900 text-lg mx-10 "} to='/dashboard/manageclass'><Slide><p className='flex items-center gap-3'><FaStream/> Manage Class</p></Slide></NavLink> 
                <hr className='my-4' />
                <NavLink className={({ isActive }) => isActive ? "  text-decoration-none text-lg mx-10 active " : " text-decoration-none text-slate-900 text-lg mx-10 "} to='/'><Slide><p className='flex items-center gap-3'><FaHome/> Home</p></Slide></NavLink> 
                </>
            }


            {
              isInstructor && <>  <NavLink className={({ isActive }) => isActive ? " text-decoration-none mx-10 text-lg active" : " text-lg text-slate-900 text-decoration-none mx-10"} to='/dashboard/addclass'><Slide><p className='flex items-center gap-3'><FaPlus /> Add Class</p></Slide></NavLink>
                <NavLink className={({ isActive }) => isActive ? " text-decoration-none text-lg mx-10 active  " : "  text-decoration-none text-slate-900 text-lg mx-10 "} to='/dashboard/myclass'><Slide><p className='flex items-center gap-3'><FaCheck /> My Class</p></Slide></NavLink>
                <hr className='my-4' />
                <NavLink className={({ isActive }) => isActive ? "  text-decoration-none text-lg mx-10 active " : " text-decoration-none text-slate-900 text-lg mx-10 "} to='/'><Slide><p className='flex items-center gap-3'><FaHome/> Home</p></Slide></NavLink> 
                  </>
            }

            {
              isStudent && <>   <NavLink className={({ isActive }) => isActive ? " text-decoration-none mx-10 text-lg active" : " text-lg text-slate-900 text-decoration-none mx-10"} to='/dashboard/selectedclass'><Slide><p className='flex items-center gap-3'><FaArrowRight />  Selected Class</p> </Slide></NavLink>
                <NavLink className={({ isActive }) => isActive ? " text-decoration-none text-lg mx-10 active  " : "  text-decoration-none text-slate-900 text-lg mx-10 "} to='/dashboard/enrolledclass'><Slide><p className='flex items-center gap-3'><FaCheckCircle />  Enrolled Class</p></Slide></NavLink>
                <NavLink className={({ isActive }) => isActive ? " text-decoration-none text-lg mx-10 active  " : "  text-decoration-none text-slate-900 text-lg mx-10 "} to='/dashboard/paymenthistory'> <Slide><p className='flex items-center gap-3'><FaMoneyBillAlt /> Payment History</p></Slide></NavLink>
                <NavLink className={({ isActive }) => isActive ? " text-decoration-none text-lg mx-10 active  " : "  text-decoration-none text-slate-900 text-lg mx-10 "} to='/dashboard/postphoto'> <Slide><p className='flex items-center gap-3'><FaImage/> Post Photo</p></Slide></NavLink>
                <hr className='my-4' />
                <NavLink className={({ isActive }) => isActive ? "  text-decoration-none text-lg mx-10 active " : " text-decoration-none text-slate-900 text-lg mx-10 "} to='/'><Slide><p className='flex items-center gap-3'><FaHome/> Home</p></Slide></NavLink> 
                 </>
            }


          </ul>

        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Dashboard;