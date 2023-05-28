import { AppThunk } from '@redux/store';
import { slice } from './slice';
import client from '@/utils/apolloClient';
import { GET_ME } from '@/utils/consts';

export const { setUserLogin, setAuthChecking } = slice.actions;

export const getUser = (): AppThunk => (dispatch) => {
  dispatch(setAuthChecking(true));

  client
    .query<{ viewer: { login: string } }>({
      query: GET_ME,
    })
    .then((result) => {
      const {
        data: {
          viewer: { login },
        },
      } = result;
      dispatch(setUserLogin(login));
    })
    .catch((error) => {
      console.log('error', error);
    })
    .finally(() => {
      dispatch(setAuthChecking(false));
    });
};
