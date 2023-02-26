import { configureStore } from '@reduxjs/toolkit'
import addData from './sliceRedux'


export const store = configureStore({
  reducer: {
    data: addData,
  },
})