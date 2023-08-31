import { ChangeEventHandler } from "react";

type loginFieldType = {
  labelText: string;
  labelFor: string;
  id: string;
  name: string;
  type: string;
  autoComplete: string;
  isRequired: boolean;
  placeholder: string;
};

type signupFieldType = {
  labelText: string;
  labelFor: string;
  id: string;
  name: string;
  type: string;
  autoComplete: string;
  isRequired: boolean;
  placeholder: string;
};

type InputProps = {
  handleChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  labelText: string;
  labelFor: string;
  id: string;
  name: string;
  type: string;
  isRequired: boolean;
  placeholder: string;
  customClass: string;
};

type SigninSignoutHeaderProps = {
  heading: string;
  paragraph: string;
  linkName: string;
  linkUrl: string;
  page: "signin" | "signup";
};

type SubmitBtnProps = {
  text: string;
  handleSubmit?: any;
  disabled?: boolean;
};

type UserType = {
  username?: string,
  email?: string,
  _id?: string,
  blogs?: string[],
  followers?: string[],
  following?: string[],
  bio?: string
}

type CredentialType = {
  email?: string,
  username?: string,
  password?: string,
  "confirm-password"?: string
}

type BlogType = {
  title?: string,
  _id?: string,
  author?: any,
  tag?: string,
  content?: string
}

export type { InputProps, SigninSignoutHeaderProps, SubmitBtnProps, loginFieldType, signupFieldType, UserType, CredentialType, BlogType };