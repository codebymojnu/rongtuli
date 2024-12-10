export default function PostHeader({ posts }) {
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img
          className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
          src="./assets/images/avatars/avatar_1.png"
          alt="avatar"
        />
        <div>
          <h6 className="text-lg lg:text-xl">Sumit Saha</h6>
          <div className="flex items-center gap-1.5">
            <img src="./assets/icons/time.svg" alt="time" />
            <span className="text-sm text-gray-400 lg:text-base">
              12 min ago
            </span>
          </div>
        </div>
      </div>
      <div className="relative">
        <button>
          <img src="./assets/icons/3dots.svg" alt="3dots of Action" />
        </button>

        <div className="action-modal-container">
          <button className="action-menu-item hover:text-lwsGreen">
            <img src="./assets/icons/edit.svg" alt="Edit" />
            Edit
          </button>
          <button className="action-menu-item hover:text-red-500">
            <img src="./assets/icons/delete.svg" alt="Delete" />
            Delete
          </button>
        </div>
      </div>
    </header>
  );
}
