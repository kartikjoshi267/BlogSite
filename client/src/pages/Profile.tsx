import React, { useEffect } from "react";
import userImg from "../assets/user.png";
import {
  getOtherUser,
  otherUserSetState,
  otherUserState,
  userState,
  updateFollowing,
  loggedInState,
} from "../utils";
import { useRecoilState, useRecoilValue } from "recoil";
import { Link, useParams } from "react-router-dom";

const Profile: React.FC = () => {
  const [otherUser, setOtherUser]: any = useRecoilState(otherUserState);
  const [otherUserSet, setOtherUserSet]: any =
    useRecoilState(otherUserSetState);
  const [user, setUser]: any = useRecoilState(userState);
  const { username } = useParams();
  const isLoggedIn = useRecoilValue(loggedInState);

  const handleFollowing: any = async () => {
    console.log(otherUser);
    await updateFollowing(otherUser._id, setOtherUser, setUser);
  };

  useEffect(() => {
    const fetchUser: any = async () => {
      await getOtherUser(username, setOtherUser, setOtherUserSet);
    };
    fetchUser();
  }, [otherUserSet, username]);

  return (
    <>
      <section className="mx-auto pt-2 w-full relative">
        <div className="text-center text-5xl font-bold">
          {user && user.username === otherUser.username
            ? `Your`
            : `${otherUser?.username}'s`}{" "}
          Profile
        </div>
        <div className="w-full max-w-sm mx-auto mt-20 p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col items-center pb-5">
            <img
              className="w-40 mb-3 rounded-full"
              src={userImg}
              alt={otherUser?.username}
            />
            <h5 className="text-xl font-bold text-gray-900 dark:text-white">
              {otherUser?.username}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {otherUser?.bio === "" ? `BlogSite Blogger` : otherUser?.bio}
            </span>
            <div className="flex flex-row justify-evenly items-center text-white">
              <Link
                title="Go to blogs"
                to={`/${otherUser?.username}/blogs`}
                className="m-2 w-24 flex flex-col justify-center items-center bg-gray-900 p-2 rounded-xl hover:bg-[#25428d] duration-500 cursor-pointer"
              >
                <div className="text-3xl">{otherUser?.blogs?.length}</div>
                <div>Blogs</div>
              </Link>
              <Link
                to={`/${otherUser?.username}/followers`}
                title="Click to view followers"
                className="m-2 w-24 flex flex-col justify-center items-center bg-gray-900 p-2 rounded-xl hover:bg-[#25428d] duration-500 cursor-pointer"
                >
                <div className="text-3xl">{otherUser?.followers?.length}</div>
                <div>Followers</div>
              </Link>
              <Link
                to={`/${otherUser?.username}/following`}
                title="Click to view following"
                className="m-2 w-24 flex flex-col justify-center items-center bg-gray-900 p-2 rounded-xl hover:bg-[#25428d] duration-500 cursor-pointer"
              >
                <div className="text-3xl">{otherUser?.following?.length}</div>
                <div>Following</div>
              </Link>
            </div>
            {isLoggedIn ? (
              <>
                {user._id === otherUser._id ? null : (
                  <>
                    {user.following.find((e: any) => e === otherUser._id) ===
                    undefined ? (
                      <>
                        <button
                          className="inline-flex items-center text-white bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 duration-200 rounded text-base mt-4"
                          onClick={handleFollowing}
                        >
                          Follow
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="inline-flex items-center text-black bg-white border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 duration-200 rounded text-base mt-4"
                          onClick={handleFollowing}
                        >
                          Following
                        </button>
                      </>
                    )}
                  </>
                )}
              </>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
