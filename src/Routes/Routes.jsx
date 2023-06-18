import { createBrowserRouter } from "react-router-dom";
import MainPage from "../Component/PageLayout/MainPage";
import Home from "../Component/Pages/Home/Home/Home";
import Login from "../Component/Pages/Login/Login";
import Signup from "../Component/Pages/Signup/Signup";
import Dashboard from "../Component/PageLayout/Dashboard";
import Alluser from "../Component/Pages/DashbordComponent/Admin/Alluser";

import Allinstructor from "../Component/Pages/Allinstructor/Allinstructor";
import AddClass from "../Component/Pages/DashbordComponent/Instructor/AddClass";
import MyClass from "../Component/Pages/DashbordComponent/Instructor/MyClass";
import UpdateClass from "../Component/Pages/DashbordComponent/Instructor/UpdateClass";
import ManageClass from "../Component/Pages/DashbordComponent/Admin/ManageClass";
import AllClass from "../Component/Pages/AllClass/AllClass";
import SelectedClass from "../Component/Pages/DashbordComponent/Student/SelectedClass";
import Payment from "../Component/Pages/DashbordComponent/Student/Payment";
import EnrolledClass from "../Component/Pages/DashbordComponent/Student/EnrolledClass";
import PaymentHistory from "../Component/Pages/DashbordComponent/Student/PaymentHistory";
import NotFoundPage from "../Component/Pages/NotFoundPage";
import PostPhoto from "../Component/Pages/DashbordComponent/Student/PostPhoto";



const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage/>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
          {
            path: "allinstructor",
            element: <Allinstructor />,
          },
          {
            path: "approvedclass",
            element: <AllClass />,
          },
      ],
    },{
      path:'dashboard',
      element:<Dashboard></Dashboard>,
      children:[
        {
          path:'alluser',
          element:<Alluser></Alluser>
        },
        {
          path:'addclass',
          element:<AddClass></AddClass>
        },
        {
          path:'myclass',
          element:<MyClass></MyClass>
        },
        {
          path:'updateclass/:data',
          element:<UpdateClass></UpdateClass>
        },
        {
          path:'manageclass',
          element:<ManageClass></ManageClass>
        },
    
        {
          path:'payment/:id',
          element:<Payment/>
        },
        {
          path:'selectedclass',
          element:<SelectedClass/>},
        {
          path:'enrolledclass',
          element:<EnrolledClass/>
        },
        {
          path:'paymenthistory',
          element:<PaymentHistory/>
        },
        {
          path:'postphoto',
          element:<PostPhoto/>
        }
     
      ]
    },
    {
      path:'*',
      element:<NotFoundPage></NotFoundPage>
    }
   
  ]);

  export default router;