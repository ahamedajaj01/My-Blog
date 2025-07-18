import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../appwrite/auth";

// 🔐 Signup Thunk using createAsyncThunk from Redux Toolkit
export const signupUser = createAsyncThunk(
  "auth/signupUser", // 👈 Unique action type prefix for Redux

  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      // 📤 Step 1: Call Appwrite's createUser API to register a new user
      await authService.createUser({ email, password, name });
      // 📥 Step 2: After successful signup, fetch the current user's data
      const user = await authService.getCurrentUser();
      // ✅ Return the user data to be handled by the fulfilled case in extraReducers
      return user;
    } catch (error) {
      // ❌ If any error occurs (e.g., email already taken), send the error to be handled in rejected case
      return rejectWithValue(error.message);
    }
  }
);

// 🔐 Login Thunk using createAsyncThunk from Redux Toolkit
export const loginUser = createAsyncThunk(
  "auth/loginUser", // 👈 Unique action type prefix for Redux
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await authService.loginUser({ email, password });
      const user = await authService.getCurrentUser(); // fetch logged-in user data
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Logout Thunk using createAsyncThunk from Redux Toolkit
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await authService.logoutUser();
      thunkAPI.dispatch(logout()); // Use dispatch from thunkAPI here

      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch current user Thunk using createAsyncThunk from Redux Toolkit
// This is useful to check if a user is logged in when the app starts
export const checkCurrentUser = createAsyncThunk(
  "auth/checkCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = await authService.getCurrentUser();
      if (!user) {
        return rejectWithValue("No user logged in");
      }
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch current user and update password
export const updatePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ currentPassword, newPassword }, thunkAPI) => {
    try {
      const res = await authService.updatePassword({
        currentPassword,
        newPassword,
      });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to update password"
      );
    }
  }
);

// Update/change name of the user
export const updateName = createAsyncThunk(
  "auth/changeName",
  async (newName, thunkAPI) => {
    try {
      const res = await authService.updateName(newName);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to update Name");
    }
  }
);

//  Creating a thunk to handle email update
export const updateEmail = createAsyncThunk(
  "auth/updateEmail", //  Slice/action name

  // ✅ Destructure newEmail and password from payload
  async ({ newEmail, password }, thunkAPI) => {
    try {
      //  Call your service method to update email
      const res = await authService.updateEmail({ newEmail, password });

      return res; // Return updated user object or response
    } catch (error) {
      //  Catch error and send message as rejected value
      return thunkAPI.rejectWithValue(
        error.message || "Failed to update Email"
      );
    }
  }
);

// 🔁 Initial auth state
const initialState = {
  isAuthenticated: false,
  userData: null,
  isLoading: false, // Used to show loading spinner when checking current user
  updatePasswordLoading: false,

  //  for name and email
  updateNameLoading: false,
  updateEmailLoading: false,
  errorNameUpdate: null,
  errorEmailUpdate: null,

  status: "idle", // idle | loading | succeeded | failed
  error: null,
  authReady: false,
};

// 🧠 Main auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload.userData;
      state.status = "succeeded";
    },
    // 🔓 Logout handler
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
      state.status = "idle";
      state.error = null;
    },
  },

  //  Handle async thunk states (pending, fulfilled, rejected)
  extraReducers: (builder) => {
    builder
      // 1: 🔄 When signupUser thunk is triggered but not yet completed
      .addCase(signupUser.pending, (state) => {
        state.status = "loading"; // Useful to show a loading spinner
        state.error = null;
      })
      // ✅ When signupUser is successful
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true; // Mark user as authenticated
        state.userData = action.payload; // Store user info from Appwrite
      })
      // ❌ When signupUser fails (e.g., email in use, server error)
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false; // Ensure auth is false if signup fails
        state.userData = null;
        state.error = action.payload; // Store error message for UI
      })

      // 2: 🔄 When loginUser thunk is triggered but not yet completed
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      // ✅ When loginUser is successful
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.userData = action.payload;
        state.authReady = true;
      })

      // ❌ When loginUser fails (e.g., wrong password)
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.userData = null;
        state.error = action.payload;
      })

      // 3: When logoutUser is triggered
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "idle";
        state.isAuthenticated = false;
        state.userData = null;
        state.error = null;
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 4: When checkCurrentUser is triggered
      .addCase(checkCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkCurrentUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isAuthenticated = true;
        state.status = "succeeded";
        state.isLoading = false; // <--- stop loading
        state.error = null;
        state.authReady = true;
      })
      .addCase(checkCurrentUser.rejected, (state, action) => {
        state.userData = null;
        state.isAuthenticated = false;
        state.status = "idle";
        state.isLoading = false;
        state.authReady = true;
      })

      // 5: When updatePassword is triggered
      .addCase(updatePassword.pending, (state) => {
        state.updatePasswordLoading = true;
        state.error = null;
      })

      .addCase(updatePassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.updatePasswordLoading = false;
        state.error = null;
      })

      .addCase(updatePassword.rejected, (state, action) => {
        state.status = "failed";
        state.updatePasswordLoading = false;
        state.error = action.payload || "Failed to update password";
      })

      // 6: When updateName is triggred
      .addCase(updateName.pending, (state) => {
        state.updateNameLoading = true;
        state.errorNameUpdate = null;
      })
      .addCase(updateName.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.updateNameLoading = false;
        state.errorNameUpdate = null;
      })
      .addCase(updateName.rejected, (state, action) => {
        state.status = "failed";
        state.updateNameLoading = false;
        state.errorNameUpdate = action.payload || "Failed to update password";
      })

      // 6: When updateEmail is triggred
      .addCase(updateEmail.pending, (state) => {
        state.updateEmailLoading = true;
        state.errorEmailUpdate = null;
      })
      .addCase(updateEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.updateEmailLoading = false;
        state.errorEmailUpdate = null;
      })
      .addCase(updateEmail.rejected, (state, action) => {
        state.status = "failed";
        state.updateEmailLoading = false;
        state.errorEmailUpdate = action.payload || "Failed to update password";
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
