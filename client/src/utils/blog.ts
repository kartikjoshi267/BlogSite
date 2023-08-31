import { RecoilState, atom } from "recoil";
import { BlogType } from "../constants/types";
import { Cookies } from "react-cookie";

// States
const blogState: RecoilState<BlogType> = atom<BlogType>({
  key: "blogState",
  default: {
    title: "Untitled",
    content: "",
    tag: "General",
  },
});

const allBlogsState: RecoilState<BlogType[]> = atom<BlogType[]>({
  key: "allBlogsState",
  default: [],
});

const cookies = new Cookies();

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

// URI for Backend
const backend_uri_blogs: string = import.meta.env.VITE_BACKEND_URI + "/blogs";
const backend_uri_users: string = import.meta.env.VITE_BACKEND_URI + "/users";

// Functions related to blogs
const addBlog: any = async (blog: any, setAllBlogs: any) => {
  const res: any = await fetch(`${backend_uri_blogs}/addblog`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "auth-token": cookies.get("auth-token"),
    },
    body: JSON.stringify(blog),
  });

  const newBlog: Promise<any> = await res.json();
  setAllBlogs(newBlog);
};

// const login: any = async (credentials: any) => {
//   const res = await fetch(`${backend_uri}/login`, {
//     method: "POST",
//     body: JSON.stringify(credentials),
//     headers: {
//       "Content-type": "application/json",
//     },
//   });

//   const authToken = await res.json();
//   if (authToken["authtoken"] === undefined) {
//     return authToken["error"];
//   }
//   localStorage.setItem("auth-token", authToken["authtoken"]);
//   return authToken;
// };

const getUserBlogs: any = async (setAllBlogs: any, _id: any) => {
  await fetch(`${backend_uri_users}/getallblogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: _id
    })
  })
    .then(async (response: any) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then(async (data: any) => {
      data.reverse();
      setAllBlogs(data);
    });
};

export {
  blogState,
  allBlogsState,
  getUserBlogs,
  addBlog,
};