import { useEffect, useRef, useState } from "react";
import { actions } from "../../actions";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import usePost from "../../hooks/usePost";
import useProfile from "../../hooks/useProfile";

const PostForm = ({ onClose, post = null }) => {
  const { auth } = useAuth();
  const { state, dispatch } = usePost();
  const { api } = useAxios();
  const { state: profile, dispatch: profileDispatch } = useProfile();

  const user = profile?.user ?? auth?.user;
  const fileUploaderRef = useRef();
  const [imagePreview, setImagePreview] = useState(post?.image || null);
  const [postContent, setPostContent] = useState(post?.content || "");

  useEffect(() => {
    // Set existing post data when editing
    if (post) {
      setPostContent(post.content || "");
      setImagePreview(post.image || null);
    }
  }, [post]);

  const handleImageUpload = (event) => {
    event.preventDefault();

    fileUploaderRef.current.addEventListener("change", updateImageDisplay);
    fileUploaderRef.current.click();
  };

  const updateImageDisplay = () => {
    const file = fileUploaderRef.current.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: actions.post.DATA_FETCHING });

    try {
      const formData = new FormData();
      formData.append("content", postContent);
      if (fileUploaderRef.current.files[0]) {
        formData.append("image", fileUploaderRef.current.files[0]);
      }

      const apiEndpoint = post
        ? `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}` // Edit existing post
        : `${import.meta.env.VITE_SERVER_BASE_URL}/posts`; // Create new post
      const apiMethod = post ? api.patch : api.post;

      const response = await apiMethod(apiEndpoint, formData);

      if (response.status === 200) {
        const actionType = post
          ? actions.post.DATA_UPDATED // Update existing post
          : actions.post.DATA_CREATED; // Create new post

        dispatch({ type: actionType, data: response.data });

        profileDispatch({ type: actionType, data: response.data });

        onClose(response.data); // Close the form UI or refresh
        setPostContent(""); // Clear the content
        setImagePreview(null); // Clear the preview
        fileUploaderRef.current.value = ""; // Clear the file input
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: actions.post.DATA_FETCH_ERROR,
        error: error?.response?.data,
      });
    }
  };

  return (
    <div className="card relative">
      <div className="flex justify-between gap-2 mb-4">
        <h6 className="text-center text-lg font-bold lg:text-xl">
          {post ? "Edit Post" : "Create Post"}
        </h6>
        <button
          className="text-center text-md font-bold lg:text-xl text-red-700"
          onClick={onClose}
        >
          X
        </button>
      </div>
      <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6"></div>
      <form onSubmit={handlePostSubmit}>
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
          <div className="flex items-center gap-3">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
              alt="avatar"
            />
            <div>
              <h6 className="text-lg lg:text-xl">
                {user?.firstName} {user?.lastName}
              </h6>
              <span className="text-sm text-gray-400 lg:text-base">Public</span>
            </div>
          </div>

          <button
            className="btn-primary cursor-pointer !text-gray-100"
            onClick={handleImageUpload}
          >
            <img
              src="./assets/icons/addPhoto.svg"
              alt={post ? "Change Photo" : "Add Photo"}
            />
            {post ? "Change Photo" : "Add Photo"}
          </button>

          <input
            id="file"
            type="file"
            ref={fileUploaderRef}
            hidden
            accept="image/*"
          />
        </div>

        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="Share your thoughts..."
          className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
        ></textarea>
        {imagePreview && (
          <div className="mb-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full max-h-[200px] object-cover"
            />
          </div>
        )}
        <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
          <button
            className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
            type="submit"
          >
            {post ? "Save Changes" : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
