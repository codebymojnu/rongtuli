export default function Like({ likeCount, handleLike, liked }) {
  return (
    <button
      className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
      onClick={handleLike}
    >
      {liked ? (
        <img src="./assets/icons/liked.svg" alt="Like" />
      ) : (
        <img src="./assets/icons/like.svg" alt="Like" />
      )}
      ({likeCount || 0})
    </button>
  );
}
