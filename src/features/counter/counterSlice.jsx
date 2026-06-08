import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contador : 0
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.contador += 1;
    },
    decrement: (state) => {
      state.contador -= 1;
    },
    reset: (state) => {
      state.contador = 0;
    },
    incrementByAmount: (state, action) => {
      state.contador += action.payload;
    }
  }
});

export const { increment, decrement, reset, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;