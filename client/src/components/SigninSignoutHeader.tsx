import { Link } from "react-router-dom";
import userAvatar from "../assets/user.png";
import userAvatar2 from "../assets/user2.png";
import { SigninSignoutHeaderProps } from "../constants/types";
import React from "react";

const SigninSignoutHeader: React.ElementType = ({
  heading,
  paragraph,
  linkName,
  linkUrl = "#",
  page
}: SigninSignoutHeaderProps) => {
  return (
    <div className="mb-10">
      <img className="mx-auto w-[250px]" src={(page == "signin") ? userAvatar : userAvatar2} alt="user-avatar" />
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {heading}
      </h2>
      <p className="text-center text-sm text-gray-600 mt-5">
        {paragraph}{" "}
        <Link
          to={linkUrl}
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
};

export default SigninSignoutHeader;
