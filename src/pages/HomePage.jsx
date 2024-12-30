import { useEffect, useState } from "react";
import NewPost from "../components/Posts/NewPost";
import Posts from "../components/Posts/Posts";
import useAuth from "../hooks/useAuth";
import usePost from "../hooks/usePost";
import { actions } from "./../actions/index";
import useAxios from "./../hooks/useAxios";

export default function HomePage() {
  const { state, dispatch } = usePost();
  const { auth } = useAuth();
  const { api } = useAxios();
  const [allPost, setAllPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts`
      );

      if (response.status === 200) {
        setAllPost(response?.data);
        dispatch({
          type: actions.post.DATA_FETCHED,
          data: response?.data,
        });
      }
    }
    fetchPost();
  }, []);
  return (
    <>
      <p className="text-center">This is a Home Page</p>
      <p className="text-center">Welcome, {auth?.user?.email || "Guest"} </p>
      <NewPost />

      <Posts allPost={allPost} setAllPost={setAllPost} />
    </>
  );
}
