import React from 'react';
import { Link } from 'react-router-dom';
import notFound from '../../assets/not_found.gif'
import useTitle from '../../Hooks/useTitle';
const NotFoundPage = () => {
  useTitle('Capture Camp/ErrorPage')
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
        <img src={notFound} alt="404 Error" className="w-64 md:w-96" />
        <h1 className="text-3xl md:text-5xl font-bold text-center mt-8">Page Not Found</h1>
        <p className="text-lg md:text-xl text-center mt-4">
          Sorry, the page you're looking for could not be found.
        </p>
        <Link to="/" className="text-[#3182CE] hover:underline mt-6">
          Go back to home
        </Link>
      </div>
    );
};

export default NotFoundPage;