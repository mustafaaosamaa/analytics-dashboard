import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { dashboardService } from "@/services/dashboardService";
import { DashboardData } from "@/types/dashboard";
import { DashboardUser } from "@/types/user";

interface DashboardState {
  data: DashboardData | null;

  users: DashboardUser[];

  isLoading: boolean;
  isUsersLoading: boolean;

  error: string | null;
  usersError: string | null;
}

const initialState: DashboardState = {
  data: null,

  users: [],

  isLoading: false,
  isUsersLoading: false,

  error: null,
  usersError: null,
};

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const data =
        await dashboardService.getDashboardData();

      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to load dashboard data"
      );
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "dashboard/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const users =
        await dashboardService.getUsers();

      return users;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to load users"
      );
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {
    clearDashboardData: (state) => {
      state.data = null;
      state.users = [];
      state.error = null;
      state.usersError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Dashboard
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(
        fetchDashboardData.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.data = action.payload;
          state.error = null;
        }
      )

      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) ||
          "Failed to load dashboard data";
      })

      // Users
      .addCase(fetchUsers.pending, (state) => {
        state.isUsersLoading = true;
        state.usersError = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isUsersLoading = false;
        state.users = action.payload;
        state.usersError = null;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.isUsersLoading = false;
        state.usersError =
          (action.payload as string) ||
          "Failed to load users";
      });
  },
});

export const {
  clearDashboardData,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;