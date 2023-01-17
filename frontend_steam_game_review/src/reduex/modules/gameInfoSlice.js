import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../share/request";
import axios from "axios"; // axios import 합니다.

const initialState = {
  games: [],
  game: {
    gameid: 0,
    gameimage: "",
    gamename: "",
    gamegenre: "",
    gamestar: "",
  },
  isLoading: false,
  error: null,
};

export const __getgames = createAsyncThunk(
  "getGames",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/games");
      console.log("리듀서 겟 받기", data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __addgame = createAsyncThunk(
  "addGame",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("http://localhost:3001/games", payload);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// export const __deleteTodos = createAsyncThunk(
//   "deleteTodos",
//   async (payload, thunkAPI) => {
//     try {
//       const data = await axios.delete(`http://localhost:3001/todos/${payload}`);
//       console.log(data);
//       return thunkAPI.fulfillWithValue(data.data);
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const gameInfoSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
  extraReducers: {
    // get 받아오는 리듀서
    [__getgames.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getgames.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.comments = action.payload;
      console.log("풀필드", state.games);
    },
    [__getgames.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    // post 보내는 리듀서
    [__addgame.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.games.push(action.payload);
    },
    [__addgame.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export default gameInfoSlice.reducer;