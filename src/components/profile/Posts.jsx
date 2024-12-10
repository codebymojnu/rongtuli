import CommentForm from "./CommentForm";
import CommentSection from "./CommentSection";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";

export default function Posts({ posts }) {
  return (
    <div>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>
      <article className="card mt-6 lg:mt-8">
        <PostHeader />
        <PostContent />
        <PostFooter />
        <div>
          <CommentForm />
          <CommentSection />
        </div>
      </article>
    </div>
  );
}
