import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <>
      <div className="flex items-center justify-center mt-20">
        <div className="flex-col space-y-7 text-center">
          <div className="text-blue-600 text-3xl font-medium">BlogSite</div>
          <div className="text-5xl font-medium">Page not found</div>
          <div className="text-gray-500">
            Sorry, the page you're looking for isn't available.
          </div>
          <div className="flex items-center justify-center">
            <Link to="/" className="bg-blue-600 px-4 py-1 text-white font-medium rounded-lg  hover:scale-105 cursor-pointer">
              Visit Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
