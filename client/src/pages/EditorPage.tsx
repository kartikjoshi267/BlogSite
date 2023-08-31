import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  addBlog,
  allBlogsState,
  blogState,
  getOtherUser,
  otherUserSetState,
  otherUserState,
} from "../utils";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import Locked from "../hoc/Locked";

const EditorPage: React.FC = () => {
  const [blog, setBlog] = useRecoilState(blogState);
  const [_, setAllBlogs] = useRecoilState(allBlogsState);
  const [otherUser, setOtherUser] = useRecoilState(otherUserState);
  const [__, setOtherUserState] = useRecoilState(otherUserSetState);
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getOtherUser(username, setOtherUser, setOtherUserState);
  }, [username]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addBlog(blog, setAllBlogs);
    setBlog({
      title: "Untitled",
      content: "",
      author: "",
      tag: "General"
    })
    navigate(`/${otherUser.username}/blogs`);
  };

  return (
    <>
      <Locked />
      <div className="w-3/4 mx-auto my-6">
        <input
          value={blog.tag}
          onChange={(e) => {
            setBlog({ ...blog, tag: e.target.value });
          }}
          type="text"
          name="tag"
          className="border-2 border-transparent hover:border-gray-300 mb-2 p-2 text-blue-500 rounded-md"
        />
        <textarea
          value={blog.title}
          onChange={(e) => {
            setBlog({ ...blog, title: e.target.value });
          }}
          name="title"
          maxLength={100}
          rows={1}
          className="border-2 border-transparent hover:border-gray-300 text-5xl text-blue-900 font-bold mb-3 w-11/12 resize-y rounded p-1"
        ></textarea>
        <JoditEditor
          value={blog.content}
          onChange={(e) => {
            setBlog({ ...blog, content: e });
          }}
          className="mb-3"
        />
        <button
          onClick={handleSubmit}
          className="mx-auto hover:bg-blue-600 text-white p-2 w-28 rounded-lg bg-blue-500 duration-500"
        >
          Post
        </button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default EditorPage;
