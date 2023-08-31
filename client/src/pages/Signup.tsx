import React from "react";
import SigninSignoutHeader from "../components/SigninSignoutHeader";
import { signupFields } from "../constants";
import { signupFieldType } from "../constants/types";
import Input from "../components/Input";
import SubmitBtn from "../components/SubmitBtn";
import { useRecoilState } from "recoil";
import { createUser, credentialsSignupState, loadingState } from "../utils";
import { toast } from "react-toastify";

const Signup: React.ElementType = () => {
  const [credential, setCredential]: any = useRecoilState(
    credentialsSignupState
  );
  const [loading, setLoading] = useRecoilState(loadingState);
  const fields: signupFieldType[] = signupFields;

  const handleChange = (e: any): void => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const onSubmitHandler: any = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const user = await createUser(credential);
    setLoading(false);
    if (user['error'] === undefined){
      toast("Account created successfully", {
        autoClose: 2000,
        type: "success",
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.pathname = '/signin';
      }, 2000);
    } else {
      toast(user['error'], {
        autoClose: 2000,
        type: "error",
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <>
      <br />
      <SigninSignoutHeader
        heading="Create a new account"
        paragraph="Already have an account? "
        linkName="Sign in"
        linkUrl="/signin"
        page="signup"
      />
      <form className="mt-8 w-1/2 md:w-1/4 mx-auto space-y-6">
        <div className="-space-y-px">
          {fields.map((field) => (
            <Input
              customClass=" my-3"
              key={field.id}
              handleChange={(e: any) => handleChange(e)}
              value={credential[field.name]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
        </div>
        <SubmitBtn handleSubmit={onSubmitHandler} text={loading ? "Creating account..." : "Create Account"} disabled={loading} />
      </form>
    </>
  );
};

export default Signup;
