
import { useContext } from "react";
import { Authcontext } from "../Component/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useStudent = () => {
    const {user, loader} = useContext(Authcontext);
    const [axiosSecure] = useAxiosSecure();
    // use axios secure with react query
    const {data: isStudent, isLoading: isStudentLoading} = useQuery({
        queryKey: ['isStudent', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/student/${user?.email}`);
            console.log('std')
            return res.data.student;
        }
    })
    return [isStudent, isStudentLoading]
};

export default useStudent;














