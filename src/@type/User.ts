export type UserLogin = {
  email: string;
  password: string;
};

export type JWTToken = {
  token: string;
  refreshToken: string;
};

export type User = {
  email: string;
  password: string;
};

export type CreatedUser = {
  status: string;
  message: string;
};

export type UserInforResponse = {
  id: number;
  email: string;
  fullName: string;
  photoUrl: string;
};

export type UserData = {
  id: number;
  email: string;
  fullName: string;
  photoUrl: string;
  age: number;
  gender: string;
  introduction: string;
  lookingFor: string;
  interests: string;
  city: string;
  country: string;
};
