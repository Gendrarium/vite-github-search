import { RootState } from '@redux/store';

export const selectUserLogin = (state: RootState) => state.user.userLogin;
export const selectAuthChecking = (state: RootState) => state.user.authChecking;
