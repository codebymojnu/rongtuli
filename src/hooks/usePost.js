import { useContext } from "react";
import { PostContext } from "../context/PostContext";

export default function usePost() {
    const context = useContext(PostContext);

    if (!context) {
        throw new Error("usePost must be used within a PostProvider");
    }

    return context; // This should return { state, dispatch }
}
