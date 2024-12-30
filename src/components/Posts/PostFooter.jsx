import { useState } from "react";
import useAuth from "./../../hooks/useAuth";
import useAxios from "./../../hooks/useAxios";
import Like from "./Like";

export default function PostFooter({ post, comments }) {
  const { auth } = useAuth();
  const { api } = useAxios();
  const [likeCount, setLikeCount] = useState(post?.likes?.length);
  const [liked, setLiked] = useState(post?.likes.includes(auth?.user?.id));

  async function handleLike() {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/like`
      );

      console.log(response);
      if (response.status === 200) {
        setLikeCount(response?.data?.likeCount);
        setLiked(!liked);
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <>
      <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
        <Like handleLike={handleLike} likeCount={likeCount} liked={liked} />

        <button className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm">
          <img src="./assets/icons/comment.svg" alt="Comment" />
          <span>Comment({comments?.length})</span>
        </button>

        <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
          <img src="./assets/icons/share.svg" alt="Share" />
          <span>Share</span>
        </button>
      </div>
    </>
  );
}
