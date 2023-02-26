import { createSlice } from '@reduxjs/toolkit';

export const createRedux = createSlice({
  name: 'data',
  initialState: {
    value: [],
  },
  reducers: {
    addData: (state, action) => {
      state.value = action.payload
    },
    addCart: (state, action) => {
      state.value.push(action.payload)
    },
    delCart: (state, action) => {
      state.value = state.value.filter(el => el.film !== action.payload)
    }
  }
})
export const { addData, addCart, delCart } = createRedux.actions

export default createRedux.reducer