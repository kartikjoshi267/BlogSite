import React, { useEffect } from "react";
import Blog from "../components/Blog";
import { useRecoilState } from "recoil";
import {
  allBlogsState,
  getOtherUser,
  getUserBlogs,
  otherUserSetState,
  otherUserState,
} from "../utils";
import { useParams } from "react-router-dom";
import _ from "lodash";
import noBlogImg from "../assets/noblog.png";

const Blogs: React.FC = () => {
  const [allBlogs, setAllBlogs] = useRecoilState(allBlogsState);
  const [otherUser, setOtherUser] = useRecoilState(otherUserState);
  const [__, setState] = useRecoilState(otherUserSetState);
  const { username } = useParams();
  useEffect(() => {
    const fetchUser: any = async () => {
      await getOtherUser(username, setOtherUser, setState);
    };
    fetchUser();
  }, [username]);

  useEffect(() => {
    const fetchBlogs: any = async () => {
      if (allBlogs.length === 0 && otherUser)
        await getUserBlogs(setAllBlogs, otherUser._id);
    };
    if (!_.isEqual(otherUser, {})) fetchBlogs();
  }, [otherUser]);

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col flex-wrap -m-4">
            {allBlogs.length === 0 ? (
              <>
                <img className="mx-auto border-2 w-56 rounded-full m-3" src={noBlogImg} alt="no blog img" />
                <h2 className="mx-auto text-4xl font-bold">No Blogs Exist</h2>
              </>
            ) : (
              <>
                {allBlogs.map((elem: any): any => {
                  return <Blog key={elem._id} blog={elem} />;
                })}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blogs;
