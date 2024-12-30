import { useState } from "react";
import useAuth from "./../../hooks/useAuth";
import useAxios from "./../../hooks/useAxios";
import useProfile from "./../../hooks/useProfile";
import CommentList from "./CommentList";
import PostFooter from "./PostFooter";

export default function CommentForm({ post }) {
  const { api } = useAxios();
  const { state } = useProfile();
  const { auth } = useAuth();

  // Determine avatar URL
  const avatarURL = state?.user?.avatar || auth?.user?.avatar;

  // State for comment input and comments list
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.comments || []);

  // Handle adding a comment
  const addComment = async (e) => {
    if (e.key === "Enter" && comment.trim()) {
      try {
        const response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/comment`,
          { comment }
        );

        if (response.status === 200) {
          setComments(response?.data?.comments);
          setComment("");
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  return (
    <>
      <PostFooter post={post} comments={comments} />
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
          src={`${import.meta.env.VITE_SERVER_BASE_URL}/${avatarURL}`}
          alt="avatar"
        />

        <div className="flex-1">
          <input
            type="text"
            className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
            name="post"
            id="post"
            placeholder="What's on your mind?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={addComment}
          />
        </div>
      </div>
      <CommentList comments={comments} />
    </>
  );
}
