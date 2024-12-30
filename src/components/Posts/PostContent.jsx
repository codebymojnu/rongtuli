export default function PostContent({ postContent, postImage }) {
  console.log(postImage);
  return (
    <div className="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl">
      <div className="flex items-center justify-center flex-col overflow-hidden">
        <p className="mb-4">{postContent}</p>
        <div>
          {postImage && (
            <img
              className="lg:h-[400px] lg:w-[600px]md:h-[400px] md:w-[600px]"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${postImage}`}
              alt="poster"
            />
          )}
        </div>
      </div>
    </div>
  );
}
