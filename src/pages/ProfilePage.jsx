import { useEffect } from "react";
import ProfileInfo from "../components/profile/ProfileInfo";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import useProfile from "../hooks/useProfile";

export default function ProfilePage() {
  const { auth } = useAuth();
  const { state, dispatch } = useProfile();
  const { api } = useAxios();

  useEffect(() => {
    dispatch({ type: "PROFILE_DATA_FETCHING" });
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );
        if (response.status === 200) {
          dispatch({ type: "PROFILE_DATA_FETCHED", data: response.data });
        }
      } catch (error) {
        dispatch({ type: "PROFILE_DATA_FETCHED_ERROR", error: error.message });
      }
    };

    fetchProfile();
  }, []);

  if (state?.loading) {
    return <div>fetching profile data...</div>;
  }

  return (
    <div>
      <p>
        {state?.error && state?.user === null
          ? "Error when fetching profile"
          : null}
      </p>
      <div className="container">
        {state?.user && <ProfileInfo user={state.user} />}
      </div>
    </div>
  );
}
