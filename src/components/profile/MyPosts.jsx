import { useState } from "react";
import Posts from "../Posts/Posts";

export default function MyPosts({ posts }) {
  const [allPost, setAllPost] = useState(posts);
  return (
    <>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>
      <Posts allPost={allPost} setAllPost={setAllPost} />
    </>
  );
}
