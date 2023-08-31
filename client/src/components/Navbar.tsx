import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { loggedInState, userState, getUser, handleSignOut } from "../utils";
import { useRecoilState } from "recoil";
import { Cookies } from "react-cookie";

const cookies = new Cookies();
const Navbar: React.FC = () => {
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {
    const fetchUser = async () => {
      if (cookies.get('auth-token') !== undefined){
        await getUser(setUser, setLoggedIn);
      }
    };
    fetchUser();
  }, []);
  return (
    <>
      <header id="navbar" className="text-gray-600">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            to="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <span className="ml-auto text-3xl font-bold text-blue-600">
              BlogSite
            </span>
          </Link>
          {!loggedIn || user === undefined ? (
            <>
              <nav className="md:ml-auto flex flex-wrap align-middle items-center text-base justify-center">
                <Link
                  to="/"
                  className="mx-2 md:mr-5 hover:text-gray-900 cursor-pointer"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="mx-2 md:mr-5 hover:text-gray-900 cursor-pointer"
                >
                  About Me
                </Link>
              </nav>
              <div>
                <Link
                  to="/signin"
                  className="inline-flex items-center text-white bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 duration-200 rounded text-base mt-4 md:mt-0"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center text-white bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 duration-200 rounded text-base mt-4 mx-2 md:mt-0"
                >
                  Sign Up
                </Link>
              </div>
            </>
          ) : (
            <>
              <nav className="md:ml-auto flex flex-wrap align-middle items-center text-base justify-center">
                <Link
                  to={`/${user.username}/blogs`}
                  className="mx-2 md:mr-5 hover:text-gray-900 cursor-pointer"
                >
                  My Blogs
                </Link>
                <Link
                  to={`${user.username}/blogs/new`}
                  className="mx-2 md:mr-5 hover:text-gray-900 cursor-pointer"
                >
                  New Post
                </Link>
              </nav>
              <div>
                <Link
                  to={`/profile/${user.username}`}
                  className="inline-flex items-center text-white bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 duration-200 rounded text-base mt-4 md:mt-0"
                >
                  {user.username}
                </Link>
                <div
                  className="inline-flex items-center text-white bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 duration-200 rounded text-base mt-4 mx-2 md:mt-0 cursor-pointer"
                  onClick={handleSignOut}
                >Sign Out</div>
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
