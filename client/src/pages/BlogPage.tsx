import React, { Suspense, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import userImg from "../assets/user.png";
import { loggedInState, updateFollowing, userState } from "../utils";
import { useRecoilState, useRecoilValue } from "recoil";
import _ from "lodash";
import JoditEditor from "jodit-react";

const BlogPage: React.FC = () => {
  let host = import.meta.env.VITE_BACKEND_URI;
  if (host === undefined){
    host = location.protocol + "//" + location.hostname;
  }
  const backend_uri: string = host;
  const isLoggedIn = useRecoilValue(loggedInState);
  const [author, setAuthor] = useState(null);
  const [blog, setBlog] = useState(null);
  const [user, setUser] = useRecoilState(userState);
  const { id } = useParams();
  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch(`${backend_uri}/blogs/getblog/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setBlog(await res.json());
    };
    fetchBlog();
  }, [location]);

  useEffect(() => {
    const fetchAuthor = async () => {
      const res = await fetch(`${backend_uri}/users/getuserbyid`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: blog.author,
        }),
      });
      setAuthor(await res.json());
    };
    if (blog) fetchAuthor();
  }, [blog]);

  const handleFollowing: any = async () => {
    await updateFollowing(author._id, setAuthor, setUser);
  };

  return (
    <>
      <div className="max-w-screen-lg mx-auto">
        <main className="mt-10">
          <div className="mb-4 md:mb-0 w-full mx-auto relative">
            <div className="mx-4 lg:mx-0 px-4 lg:px-0">
              <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
                {blog?.title}
              </h2>
              <a
                href="#"
                className="py-2 text-blue-700 inline-flex items-center justify-center mb-2"
              >
                {blog?.tag}
              </a>
            </div>
          </div>
          <div className="flex flex-col items-stretch justify-stretch">
            {/* <ReactQuill
              className="lg:-mx-4 mx-0 px-4 lg:px-0 text-gray-700 leading-relaxed w-full lg:w-3/4"
              id="blog-content"
              value={blog?.content}
              readOnly={true}
              theme={"bubble"}
            /> */}
            <div className="px-4 lg:px-0 text-lg leading-relaxed w-full h-full">
              <Suspense fallback={<div>Loading...</div>}>
                <JoditEditor
                  config={{ readonly: true, toolbar: false }}
                  value={blog?.content}
                />
              </Suspense>
            </div>
            <br />
            <hr />
            <div className="my-8">
              <h1>About the author</h1>
              <div className="p-4 border-2 rounded-lg">
                <Link
                  to={`/profile/${author?.username}`}
                  className="flex flex-col py-2 items-center text-gray-700 hover:text-blue-600"
                >
                  <img
                    src={userImg}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm">
                      {" "}
                      {author?.username}{" "}
                    </p>
                  </div>
                </Link>
                <p className="text-gray-700 mb-3 px-2">
                  {author?.bio === ""
                    ? "Passionate BlogSite Blogger"
                    : author?.bio}
                </p>
                {isLoggedIn &&
                !_.isEqual(user, {}) &&
                author &&
                user._id !== author._id ? (
                  <>
                    {user.following.find((e: any) => e === author._id) ===
                    undefined ? (
                      <button
                        className="items-center text-white bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 duration-200 rounded text-base w-full"
                        onClick={handleFollowing}
                      >
                        Follow
                      </button>
                    ) : (
                      <button
                        className="items-center text-black bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 duration-200 rounded text-base w-full"
                        onClick={handleFollowing}
                      >
                        Following
                      </button>
                    )}
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </main>
      </div>
      <br />
      <br />
      <br />
    </>
  );
};

export default BlogPage;
