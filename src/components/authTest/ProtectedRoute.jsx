import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const user = useSelector((store) => store);

  const { _id, username, token } = user;
  console.log(_id, username, token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!_id) {
      return navigate("/login", { replace: true });
    }
    const getUser = async()=>{
      const response = await fetchUser(_id,username,token)
    }
    getUser()
  }, []);

  return (
    <div>
      <h1>Protected Route</h1>
    </div>
  );
};

export default ProtectedRoute;
