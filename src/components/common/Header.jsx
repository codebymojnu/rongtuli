import { Link, useNavigate } from "react-router-dom";
import useAuth from "./../../hooks/useAuth";
import useProfile from "./../../hooks/useProfile";

export default function Header() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const { state } = useProfile();
  console.log(state?.user?.avatar);

  const user = state?.user ?? auth?.user;

  function logout() {
    setAuth({});
    navigate("/login");
  }
  return (
    <nav className="sticky top-0 z-50 border-b border-[#3f3f3f] bg-[#1E1F24] py-4">
      <div>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link to="/">
            <img
              className="max-w-[100px] lg:max-w-[130px] rounded-full"
              src="./assets/images/logo.svg"
              alt="logo"
            />
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className="btn-primary">
              <img src="./assets/icons/home.svg" alt="Home" />
              Home
            </Link>
            <button className="btn-primary">
              <img src="./assets/icons/notification.svg" alt="notification" />
            </button>
            <Link className="btn-primary" onClick={logout}>
              <img src="./assets/icons/logout.svg" alt="logout" />
            </Link>
            <Link className="flex-center ml-8 gap-3" to="/me">
              <span className="text-lg font-bold lg:text-xl">
                {user?.firstName}
              </span>
              <img
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user.avatar}`}
                alt="profile"
                className="max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px] rounded-full"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
