import { useRecoilValue } from "recoil";
import { loggedInState, otherUserState, userState } from "../utils";
import lockImg from "../assets/lock.jpg";
import { Link } from "react-router-dom";

const Locked: any = () => {
  const isLoggedIn: boolean = useRecoilValue(loggedInState);
  const otherUser: any = useRecoilValue(otherUserState);
  const user: any = useRecoilValue(userState);

  return (
    <>
      {!isLoggedIn ? (
        <div className="relative">
          <div className="bg-gray-200 bg-opacity-60 h-screen absolute w-full z-50 text-center flex flex-col justify-center items-center">
            <h1>Not logged in</h1>
            <img src={lockImg} alt="lockImg" className="w-20 mb-10" />
            <Link
              to="/signin"
              className="text-2xl font-bold text-white bg-blue-500 p-2 rounded-xl hover:bg-blue-700 duration-200"
            >
              Login to Continue
            </Link>
          </div>
        </div>
      ) : otherUser.username !== user.username ? (
        <div className="relative">
          <div className="bg-gray-200 bg-opacity-60 h-screen absolute w-full z-50 text-center flex flex-col justify-center items-center">
            <h1>Not Permitted</h1>
            <img src={lockImg} alt="lockImg" className="w-20 mb-10" />
            <Link
              to={`/${user.username}/blogs/new`}
              className="text-2xl font-bold text-white bg-blue-500 p-2 rounded-xl hover:bg-blue-700 duration-200"
            >
              Create a new blog
            </Link>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Locked;
