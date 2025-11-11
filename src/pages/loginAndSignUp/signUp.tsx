import React from "react";
import { Link } from "react-router-dom";
export const SignUp = () => {
  return (
    <div className="signUp">
      <p>signup page</p>
      <Link to={"/signIn"}>SignIn</Link>
    </div>
  );
};
