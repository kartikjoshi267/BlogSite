import React from "react";
import userImg from "../assets/user.png";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loggedInState } from "../utils";

const UserFollowComp: React.ElementType = ({ thisUser, user, handleFollowing }: any) => {
  const isLoggedIn = useRecoilState(loggedInState);
  return (
    <div className="text-base leading-relaxed text-gray-500 flex flex-row items-center justify-between w-full">
      <Link
        to={`/profile/${thisUser.username}`}
        className="flex flex-row items-center hover:text-blue-700 font-bold duration-300"
      >
        <img src={userImg} className="hidden sm:block w-20 lg:w-32" alt="" />
        <div className="text-md sm:text-lg">{thisUser.username}</div>
      </Link>
      {isLoggedIn && thisUser._id !== user._id ? (
        <>
          {user.following.find((e: any) => e === thisUser._id) === undefined ? (
            <button
              className="inline-flex items-center text-white bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 duration-200 rounded text-md sm:text-lg"
              onClick={() => handleFollowing(thisUser._id)}
            >
              Follow
            </button>
          ) : (
            <button
              className="inline-flex items-center text-black bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 duration-200 rounded text-md sm:text-lg"
              onClick={() => handleFollowing(thisUser._id)}
            >
              Following
            </button>
          )}
        </>
      ) : null}
    </div>
  );
};

export default UserFollowComp;
