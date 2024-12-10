import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function HomePage() {
  const { auth } = useAuth();
  return (
    <>
      <p className="text-center">This is a Home Page</p>
      <p className="text-center">Welcome, {auth?.user?.email || "Guest"} </p>
      <Link to="/me">Profile</Link>
    </>
  );
}
