import { useState } from "react";
import { actions } from "../../actions";
import { useAvatar } from "../../hooks/useAvatar";
import useProfile from "../../hooks/useProfile";
import useAuth from "./../../hooks/useAuth";
import useAxios from "./../../hooks/useAxios";
import usePost from "./../../hooks/usePost";
import timeAgo from "./timeAgo";

export default function PostHeader({ author, createAt, post, onEdit }) {
  const { auth } = useAuth();
  const { state, dispatch: profile } = useProfile();

  const [toggle, setToggle] = useState(false);
  const { avatarURL } = useAvatar(post);
  const { state: postState, dispatch } = usePost();
  const { api } = useAxios();

  async function deletePost(post) {
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}`
      );

      if (response.status === 200) {
        const updatePosts = postState?.posts?.filter((p) => p.id !== post.id);
        dispatch({ type: actions.post.DELETE, data: updatePosts });
        profile({ type: actions.profile.POST_DELETE, data: post?.id });
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
            src={avatarURL}
            alt="avatar"
          />
          <div>
            <h6 className="text-lg lg:text-xl">{author?.name}</h6>
            <div className="flex items-center gap-1.5">
              <img src="./assets/icons/time.svg" alt="time" />
              <span className="text-sm text-gray-400 lg:text-base">
                {createAt ? timeAgo(createAt) : null}
              </span>
            </div>
          </div>
        </div>
        {author?.id == auth?.user?.id && (
          <div className="relative">
            <button>
              <img
                src="./assets/icons/3dots.svg"
                alt="3dots of Action"
                onClick={() => setToggle(!toggle)}
              />
            </button>

            {toggle ? (
              <div className="action-modal-container">
                <button
                  className="action-menu-item hover:text-lwsGreen"
                  onClick={() => onEdit(post?.id)}
                >
                  <img src="./assets/icons/edit.svg" alt="Edit" />
                  Edit
                </button>
                <button
                  className="action-menu-item hover:text-red-500"
                  onClick={() => deletePost(post)}
                >
                  <img src="./assets/icons/delete.svg" alt="Delete" />
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        )}
      </header>
    </>
  );
}
