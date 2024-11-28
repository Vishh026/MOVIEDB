import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './reducers/movieSlice';
import tvShowReducer from './reducers/tvShowSlice';
import personReducer from './reducers/personSlice';


export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tvShow:tvShowReducer,
    person:personReducer,
  },
})