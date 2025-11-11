import { Link } from "react-router-dom";
export const SignIn = () => {
  return (
    <div className="signIn">
      <p>signIn page is here</p>
      <Link to={"/signUp"}>SignUp</Link>
    </div>
  );
};
