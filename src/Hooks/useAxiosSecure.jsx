import { useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Authcontext } from '../Component/AuthProvider/AuthProvider';


const axiosSecure = axios.create({
  baseURL: 'https://capture-camp-server.vercel.app', 
});

const useAxiosSecure = () => {
  const {  logoutUser } = useContext(Authcontext); 
  const navigate = useNavigate(); 

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          await  logoutUser();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );
  }, [ logoutUser, navigate]);

  return [axiosSecure];
};

export default useAxiosSecure;