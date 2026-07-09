import axiosClient from "./axiosClient";
import type { AuthResult, LoginDto, RegisterDto } from "../Models/Auth";

export const authApi = {
  login: (dto: LoginDto) => axiosClient.post<AuthResult>("/auth/login", dto).then((r) => r.data),
  register: (dto: RegisterDto) => axiosClient.post<AuthResult>("/auth/register", dto).then((r) => r.data),
  logout: () => axiosClient.post("/auth/logout"),
};
