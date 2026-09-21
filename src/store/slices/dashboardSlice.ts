import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { dashboardService } from "@/services/dashboardService";
import { DashboardData } from "@/types/dashboard";

interface DashboardState {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  data: null,
  isLoading: false,
  error: null,
};

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const data = await dashboardService.getDashboardData();

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

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {
    clearDashboardData: (state) => {
      state.data = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })

      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) ||
          "Failed to load dashboard data";
      });
  },
});

export const {
  clearDashboardData,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;