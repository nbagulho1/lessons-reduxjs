import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];

const usersSlice = createSlice({
    name: 'utilizadores',
    initialState,
    reducers: {}
});

export const selectAllUsers = (state) => state.utilizadores;
export default usersSlice.reducer;