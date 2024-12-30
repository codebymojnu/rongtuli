import { useState } from "react";
import Comment from "./Comment";

export default function CommentList({ comments }) {
  const [toggleComments, setToggleComments] = useState(false);
  return (
    <div>
      <div className="mt-4">
        <button
          className="text-gray-300 max-md:text-sm"
          onClick={() => setToggleComments(!toggleComments)}
        >
          See All Comment ▾
        </button>
      </div>

      {toggleComments && (
        <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
          {comments?.map((comment, index) => (
            <Comment comment={comment} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}
