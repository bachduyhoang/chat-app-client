import {
  User,
  JWTToken,
  UserInforResponse,
  UserData,
  CreatedUser,
} from '../../@type/User';
import { request } from '../../utils/axios';

export type GetMemberParams = {
  PageNumber?: number;
  PageSize?: number;
  SearchUserName?: string;
  Gender?: string;
  MinAge?: string;
  MaxAge?: string;
  OrderBy?: number;
};

const login = async (data: User) => {
  const requestLogin = await request.post<JWTToken>(
    `/api/authenticate/login`,
    data
  );
  if (requestLogin.data.token && requestLogin.data.refreshToken) {
    localStorage.setItem('token', requestLogin.data.token);
    localStorage.setItem('refreshToken', requestLogin.data.refreshToken);
  }
  return requestLogin.data;
};

const register = async (data: User) => {
  const requestRegister = await request.post<CreatedUser>(
    `/api/authenticate/register`,
    data
  );
  return requestRegister.data;
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

const getMe = async () => {
  const result = await request.get<UserInforResponse>(`/api/user/getme`);
  return result.data;
};

const getMember = async (searchParams: GetMemberParams) => {
  const result = await request.get<UserData[]>(`/api/user`, {
    params: { ...searchParams },
  });
  return result.data;
};
const userService = {
  getMember,
  getMe,
  login,
  logout,
  register,
};
export default userService;
