export interface User {
  id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  img: string;
  otp: null;
  verified: boolean;
  createdAt: Date;
  role: string;
  regionId: string;
}
