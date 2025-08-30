import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface MoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  favorites: number[];
}

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
  favorites: [],
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    addToFavorites: (state, action: PayloadAction<number>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
    clearMovies: (state) => {
      state.movies = [];
    },
  },
});

export const {
  setLoading,
  setMovies,
  setError,
  addToFavorites,
  removeFromFavorites,
  clearMovies,
} = moviesSlice.actions;

export default moviesSlice.reducer;