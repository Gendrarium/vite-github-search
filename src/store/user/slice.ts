import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IStateUser {
  userLogin: string;
  authChecking: boolean;
}

const initialState: IStateUser = {
  userLogin: '',
  authChecking: true,
};

// create a slice
export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLogin: (state, action: PayloadAction<string>) => {
      state.userLogin = action.payload;
    },
    setAuthChecking: (state, action: PayloadAction<boolean>) => {
      state.authChecking = action.payload;
    },
  },
});

export default slice.reducer;
