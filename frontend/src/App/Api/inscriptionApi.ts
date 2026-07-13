import axiosClient from "./axiosClient";
import type { Inscription, MyInscription } from "../Models/Inscription";

export const inscriptionApi = {
  register: (activityId: string) =>
    axiosClient.post<string>("/Inscription", { activityId }).then((r) => r.data),
  unregister: (activityId: string) =>
    axiosClient.delete(`/Inscription?activityId=${activityId}`),
  getForActivity: (activityId: string) =>
    axiosClient.get<Inscription[]>(`/Inscription?activityId=${activityId}`).then((r) => r.data),
  getMine: () => axiosClient.get<MyInscription[]>("/Inscription/me").then((r) => r.data),
};
