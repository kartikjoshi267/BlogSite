import { RecoilState, atom } from "recoil";
import { CredentialType, UserType } from "../constants/types";
import { toast } from "react-toastify";
import { Cookies } from "react-cookie";
import _ from "lodash";

// States
const userState: RecoilState<UserType> = atom<UserType>({
  key: "userState",
  default: {},
});

const otherUserState: RecoilState<UserType> = atom<UserType>({
  key: "otherUserState",
  default: {},
});

const loggedInState: RecoilState<boolean> = atom<boolean>({
  key: "loggedInState",
  default: false,
});

const otherUserSetState: RecoilState<boolean> = atom<boolean>({
  key: "otherUserSetState",
  default: false,
});

const credentialsLoginState: RecoilState<CredentialType> = atom<CredentialType>(
  {
    key: "credentialsLoginState",
    default: {
      email: "",
      password: "",
    },
  }
);

const credentialsSignupState: RecoilState<CredentialType> =
  atom<CredentialType>({
    key: "credentialsSignupState",
    default: {
      email: "",
      username: "",
      password: "",
      "confirm-password": "",
    },
  });

const cookies = new Cookies();

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

// URI for Backend
let host = import.meta.env.VITE_BACKEND_URI;
if (host === undefined){
  host = location.protocol + "//" + location.hostname;
}
const backend_uri: string = host + "/users";

// Functions related to user
const createUser: any = async (credentials: any) => {
  const res = await fetch(`${backend_uri}/createuser`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const user: Promise<any> = await res.json();
  return user;
};

const login: any = async (credentials: any) => {
  const res = await fetch(`${backend_uri}/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-type": "application/json",
    },
  });

  const authToken = await res.json();
  if (authToken["authtoken"] === undefined) {
    return authToken;
  }
  cookies.set("auth-token", authToken["authtoken"], {
    maxAge: 600 * 1000,
  });
  return authToken;
};

const getUser: any = async (setUser: any, setLoggedIn: any) => {
  await fetch(`${backend_uri}/getuser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": cookies.get("auth-token"),
      // cookies.get("auth-token"),
    },
  })
    .then(async (response: any) => {
      if (response.status === 200) {
        return response.json();
      } else {
        toast("User not authenticated. Please login.", {
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
    })
    .then(async (data: any) => {
      setUser(data);
      setLoggedIn(true);
    });
};

const getOtherUser: any = async (
  username: string,
  setOtherUser: any,
  setState: any
) => {
  await fetch(`${backend_uri}/getuserbyusername`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
    }),
  })
    .then(async (response: any) => {
      return response.json();
    })
    .then(async (data: any) => {
      if (data["error"] !== undefined) {
        toast(data["error"], {
          autoClose: 1000,
          type: "error",
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.pathname = "/";
        }, 1000);
        return;
      }
      setOtherUser(data);
      setState(true);
    });
};

const getUserById: any = async (
  id: string,
  followersArray: any[],
) => {
  let temp = followersArray.slice();
  await fetch(`${backend_uri}/getuserbyid`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  })
    .then(async (response: any) => {
      return response.json();
    })
    .then(async (data: any) => {
      if (data["error"] !== undefined) {
        toast(data["error"], {
          autoClose: 1000,
          type: "error",
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.pathname = "/";
        }, 1000);
        return;
      }
      if (temp.find(x => _.isEqual(x, data)) === undefined) {
        temp.push(data);
      }
    });
    return temp;
}

const updateFollowing: any = async (
  otherUserId: string,
  setOtherUser: any,
  setUser: any
) => {
  await fetch(`${backend_uri}/updatefollowing`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": cookies.get("auth-token"),
    },
    body: JSON.stringify({
      id: otherUserId,
    }),
  })
    .then(async (response: any) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then(async (data: any) => {
      setOtherUser(data["otherUser"]);
      setUser(data["user"]);
    });
};

const handleSignOut: any = () => {
  cookies.remove("auth-token");
  setTimeout(() => {
    window.location.pathname = "/";
  }, 500);
};

export {
  userState,
  loggedInState,
  credentialsLoginState,
  credentialsSignupState,
  createUser,
  login,
  getUser,
  otherUserState,
  getOtherUser,
  otherUserSetState,
  updateFollowing,
  handleSignOut,
  getUserById,
};
