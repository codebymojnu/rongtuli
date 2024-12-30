import { useState } from "react";
import CommentForm from "./CommentForm";
import PostContent from "./PostContent";
import PostForm from "./PostForm";
import PostHeader from "./PostHeader";

export default function Posts({ allPost, setAllPost }) {
  const [editedPostId, setEditedPostId] = useState(null);
  const [showForm, setShowForm] = useState(true);

  function handleEditClose(updatedPost) {
    if (updatedPost) {
      // Update the local state with the new post data
      setAllPost((prevPosts) =>
        prevPosts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        )
      );
    }
    setEditedPostId(null);
    setShowForm(false);
  }
  function onEdit(postId) {
    setEditedPostId(postId);
    setShowForm(true);
  }

  return (
    <div>
      {allPost?.map((post) => (
        <article key={post.id} className="card mt-6 lg:mt-8">
          {editedPostId === post?.id ? (
            showForm && <PostForm onClose={handleEditClose} post={post} />
          ) : (
            <>
              <PostHeader
                post={post}
                author={post?.author}
                createAt={post?.createAt}
                onEdit={onEdit}
              />
              <PostContent
                postContent={post?.content}
                postImage={post?.image}
              />
              <div>
                <CommentForm post={post} />
              </div>
            </>
          )}
        </article>
      ))}
    </div>
  );
}
