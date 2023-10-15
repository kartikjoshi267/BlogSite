import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import _truncate from "lodash/truncate";

const Blog: React.ElementType = ({ blog }) => {
  const [author, setAuthor] = useState(null);

  // URI for Backend
  let host = import.meta.env.VITE_BACKEND_URI;
  if (host === undefined){
    host = location.protocol + "//" + location.hostname;
  }
  const backend_uri: string = String(host) + "/users";

  useEffect(() => {
    const fetchAuthor = async () => {
      const author = await fetch(`${backend_uri}/getuserbyid`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: blog.author,
        }),
      });
      setAuthor(await author.json());
    };
    fetchAuthor();
  }, [location]);

  const contentDisplay = parse(_truncate(blog["content"], { length: 150 }));

  return (
    <>
      <Link
        to={author ? `/${author["username"]}/blogs/${blog._id}` : "/"}
        className="p-4 w-full"
      >
        <div className="h-full rounded-lg overflow-hidden bg-gray-100 hover:shadow-md duration-700 hover:scale-105 cursor-pointer">
          <div className="p-6">
            <h2 className="tracking-widest w-fit p-1 rounded-lg bg-gray-500 text-xs title-font font-medium text-gray-100 mb-1">
              {/* CATEGORY */}
              {blog["tag"]}
            </h2>
            <h1 className="title-font text-3xl font-medium text-gray-900 mb-3">
              {/* The Catalyzer */}
              {blog["title"]}
            </h1>
            <p className="leading-relaxed mb-3">{contentDisplay}</p>
            <p className="leading-relaxed mb-3">
              Authored by{" "}
              {author ? (
                <Link
                  className="italic text-blue-800 hover:underline duration-200"
                  to={`/profile/${author["username"]}`}
                >
                  {author["username"]}
                </Link>
              ) : (
                <></>
              )}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Blog;
