import { createSlice } from "@reduxjs/toolkit";

const loadUserFromLocalStorage = () => {
  try {
    const serialized = localStorage.getItem("user");
    if (!serialized) return { user: null };
    const parsed = JSON.parse(serialized);
    return { user: parsed?.user ?? parsed };
  } catch {
    return { user: null };
  }
};

const initialState = loadUserFromLocalStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;              // must include _id
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    }
  }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
