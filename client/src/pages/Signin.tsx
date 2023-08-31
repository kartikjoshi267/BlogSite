import React from "react";
import SigninSignoutHeader from "../components/SigninSignoutHeader";
import { loginFields } from "../constants/";
import { loginFieldType } from "../constants/types";
import Input from "../components/Input";
import SubmitBtn from "../components/SubmitBtn";
import { useRecoilState } from "recoil";
import { credentialsLoginState, login, loggedInState, loadingState } from "../utils";
import { toast } from "react-toastify";

const Signin: React.ElementType = () => {
  const [credential, setCredential]: any = useRecoilState(
    credentialsLoginState
  );
  const fields: loginFieldType[] = loginFields;
  const [_, setLoggedIn]: any = useRecoilState(loggedInState);
  const handleChange = (e: any): void => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  const [loading, setLoading]: any = useRecoilState(loadingState);

  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    const res = await login({
      email: credential['email'],
      password: credential['password']
    });
    setLoading(false);
    if (res['error'] !== undefined){
      toast(res['error'], {
        autoClose: 2000,
        type: "error",
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    setLoggedIn(true);
    toast("Login successful", {
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
      setCredential({
        email: "",
        password: "",
      })
      window.location.pathname = '/';
    }, 2000)
  }

  return (
    <>
      <br />
      <SigninSignoutHeader
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Sign Up"
        linkUrl="/signup"
        page="signin"
      />
      <form className="mt-8 w-1/2 md:w-1/4 mx-auto space-y-6">
        <div className="-space-y-px">
          {fields.map((field) => (
            <Input
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
        <SubmitBtn handleSubmit={handleSubmit} text={loading ? "Logging in..." : "Login"} disabled={loading} />
      </form>
    </>
  );
};

export default Signin;
