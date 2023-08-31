import React from "react";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loggedInState, userState } from "../utils";

const Header: React.FC = () => {
  const loggedIn = useRecoilValue(loggedInState);
  const user = useRecoilValue(userState);
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-5xl text-4xl mb-4 font-medium text-gray-900">
              BlogSite
              <br className="hidden lg:inline-block" />
              <div className="sm:text-2xl text-xl">
                Pour your thoughts here!
              </div>
            </h1>
            <p className="mb-8 leading-relaxed">
              Welcome to our captivating world of insightful articles, vibrant
              stories, and expert perspectives. Dive into a realm where
              knowledge meets inspiration, and embark on a journey of discovery
              with our engaging blog posts.
            </p>
            <div className="flex justify-center">
              <Link
                to={!loggedIn ? `/signin` : `/${user?.username}/blogs/new`}
                className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
              >
                Start blogging
              </Link>
              {loggedIn ? null : (
                <Link
                  to="/about"
                  className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg text-center"
                >
                  About Me
                </Link>
              )}
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-11/12 w-11/12">
            <img
              className="object-cover object-center rounded-2xl"
              alt="hero"
              src={logo}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
