import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getOtherUser,
  otherUserSetState,
  otherUserState,
  userState,
} from "../utils";
import { useRecoilState } from "recoil";
import _ from "lodash";
import UserFollowComp from "../components/UserFollowComp";
import { Cookies } from "react-cookie";

const FollowersPage: React.FC = () => {
  const { username } = useParams();
  const [otherUser, setOtherUser]: any = useRecoilState(otherUserState);
  const [__, setOtherUserSet]: any = useRecoilState(otherUserSetState);
  const [followingUsers, setFollowingUsers]: any = useState([]);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const fetchFollowing: any = async () => {
      if (!_.isEqual(otherUser, {})) {
        let host = import.meta.env.VITE_BACKEND_URI;
        if (host === undefined){
          host = location.protocol + "//" + location.hostname;
        }
        const res: any = await fetch(host+"/users/getfollowers", {
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: otherUser.username,
          }),
          method: "POST"
        });
        setFollowingUsers(await res.json());
      }
    };
    fetchFollowing();
  }, [username]);

  useEffect(() => {
    const fetchUser: any = async () => {
      await getOtherUser(username, setOtherUser, setOtherUserSet);
    };
    fetchUser();
  }, [username]);

  const handleFollowing: any = async (id: string) => {
    let host = import.meta.env.VITE_BACKEND_URI;
    if (host === undefined){
      host = location.protocol + "//" + location.hostname;
    }
    await fetch(`${host}/users/updatefollowing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": new Cookies().get("auth-token"),
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then(async (data: any) => {
        setUser(data["user"]);
      });
  };

  return (
    <>
      <div
        id="modal"
        aria-hidden="true"
        className={`z-50 w-full mx-auto p-14 overflow-x-hidden overflow-y-auto md:inset-0`}
      >
        <div className="w-full">
          <div className="bg-white rounded-lg">
            <div className="flex items-start justify-between p-4 rounded-t">
              <h3 className="text-5xl font-semibold text-gray-900">
                Followers
              </h3>
            </div>
            <hr />
            <div className="flex flex-col p-6 space-y-6">
              {followingUsers.length === 0 ? (
                <div className="mx-auto text-gray-500 text-xl">
                  No Followers
                </div>
              ) : (
                <>
                  {followingUsers.map((f: any, index: number) => (
                    <UserFollowComp
                      key={index}
                      thisUser={f}
                      user={user}
                      otherUser={otherUser}
                      handleFollowing={handleFollowing}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowersPage;
