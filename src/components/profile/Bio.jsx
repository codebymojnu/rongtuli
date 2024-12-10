import { useEffect, useState } from "react";
import api from "../../api";
import useAuth from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";
// Ensure api is imported correctly

export default function Bio() {
  const { state, dispatch } = useProfile();
  const { auth } = useAuth();
  const [bio, setBio] = useState("");
  const [editMode, setEditMode] = useState(false);

  // Keep `bio` state in sync with `state.user.bio`
  useEffect(() => {
    setBio(state?.user?.bio || "");
  }, [state?.user?.bio]);

  function handleBioEdit() {
    setEditMode(true);
  }

  function bioText(e) {
    setBio(e.target.value);
  }

  async function handleBioSubmit() {
    dispatch({ type: "PROFILE_DATA_FETCHING" });
    try {
      const response = await api.patch(`/profile/${auth?.user?.id}`, { bio });
      if (response.status === 200) {
        dispatch({ type: "BIO_UPDATED", data: response.data });
      }
    } catch (error) {
      dispatch({ type: "PROFILE_DATA_FETCHED_ERROR", error: error.message });
    } finally {
      setEditMode(false);
    }
  }

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {editMode ? (
          <textarea
            rows={3}
            cols={54} // Corrected attribute name
            onChange={bioText}
            value={bio}
            className="text-red-500"
          ></textarea>
        ) : (
          <p className="leading-[188%] text-gray-400 lg:text-lg">{bio}</p>
        )}
      </div>

      {editMode ? (
        <button onClick={handleBioSubmit}>Save</button>
      ) : (
        <button
          className="flex-center h-7 w-7 rounded-full"
          onClick={handleBioEdit}
        >
          <img src="./assets/icons/edit.svg" alt="Edit" />
        </button>
      )}
    </div>
  );
}
