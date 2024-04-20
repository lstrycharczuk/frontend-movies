import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
 name: "movies",
 initialState: {
    list: [],
 },
 reducers: {
    getMovies: (state, action) => {
      const movies = action.payload;
      return {
        ...state,
        list: [...state.list, ...movies],
      };
    },
 },
});

export const { getMovies } = movieSlice.actions;

export default movieSlice.reducer;