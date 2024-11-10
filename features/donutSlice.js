import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Tạo async thunk để gọi API và thêm sản phẩm mới
export const addDonut = createAsyncThunk('donuts/addDonut', async (newDonut) => {
  const response = await axios.post('https://671d478a09103098807cb8dd.mockapi.io/bicycle', newDonut);
  return response.data;
});

// Tạo async thunk để lấy danh sách sản phẩm
export const fetchDonuts = createAsyncThunk('donuts/fetchDonuts', async (category) => {
  let apiUrl = 'https://671d478a09103098807cb8dd.mockapi.io/bicycle';
  if (category) {
    apiUrl += `?category=${category}`;
  }

  const response = await axios.get(apiUrl);
  return response.data;
});

const donutSlice = createSlice({
  name: 'donuts',
  initialState: {
    donuts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Thêm sản phẩm mới
      .addCase(addDonut.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDonut.fulfilled, (state, action) => {
        state.loading = false;
        state.donuts.push(action.payload); // Thêm sản phẩm mới vào danh sách
      })
      .addCase(addDonut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Lấy danh sách sản phẩm
      .addCase(fetchDonuts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDonuts.fulfilled, (state, action) => {
        state.loading = false;
        state.donuts = action.payload;
      })
      .addCase(fetchDonuts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default donutSlice.reducer;
