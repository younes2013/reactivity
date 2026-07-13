import axiosClient from "./axiosClient";
import type { Activity, ActivityFormValues } from "../Models/Activity";

export const activityApi = {
  getAll: () => axiosClient.get<Activity[]>("/activity").then((r) => r.data),
  getById: (id: string) => axiosClient.get<Activity>(`/activity/${id}`).then((r) => r.data),
  create: (values: ActivityFormValues) =>
    axiosClient.post<string>("/activity", values).then((r) => r.data),
  update: (id: string, values: ActivityFormValues & { isCancelled: boolean }) =>
    axiosClient.put(`/activity/${id}`, { id, ...values }),
};
