import { UserLogin } from './../../@type/User';
import jwt_decode from 'jwt-decode';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import userApi from '../services/userService';
import userService from '../services/userService';

export type UserState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser | null;
};

export type UserToken = {
  nameid: string;
  exp: number;
  unique_name: string;
};

export type AuthUser = {
  userName?: string;
  email?: string;
  photoUrl?: string;
  token?: string;
  refreshToken?: string | null;
  validateTime?: number;
};

const initialState: UserState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

export const loginAsync = createAsyncThunk(
  'users/login',
  async (user: UserLogin) => {
    const { email, password } = user;
    const response = await userApi.login({ email, password });
    return response;
  }
);

export const registerAsync = createAsyncThunk(
  'users/register',
  async (user: UserLogin) => {
    const { email, password } = user;
    const response = await userApi.register({ email, password });
    return response;
  }
);

export const getMe = createAsyncThunk('users/getme', async () => {
  const response = await userApi.getMe();
  return response;
});

export const logoutAsync = createAsyncThunk('users/logout', async () => {
  userService.logout();
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initialize: (state, action: PayloadAction<UserState>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.isInitialized = action.payload.isInitialized;
      state.user = { ...action.payload.user };
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = { ...action.payload.user };
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      const user = jwt_decode<UserToken>(action.payload.token);
      state.isAuthenticated = true;
      state.user = {
        email: user.nameid,
        validateTime: user.exp,
        token: action.payload!.token,
        refreshToken: action.payload!.refreshToken,
      };
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = {
        ...state.user,
        email: action.payload.email,
        photoUrl: action.payload.photoUrl,
      };
    });
  },
});

export const { initialize, login, logout } = userSlice.actions;
export default userSlice.reducer;
