import React, { useState, useEffect } from "react";
import { getUserInfo } from "../services/UserService";

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      const response = await getUserInfo();
      setUserInfo(response);
    };
    fetchInfo();
  }, []);

  return (
    <div>
      <h2>User Info</h2>
      {userInfo ? <p>{JSON.stringify(userInfo)}</p> : <p>Loading...</p>}
    </div>
  );
}
