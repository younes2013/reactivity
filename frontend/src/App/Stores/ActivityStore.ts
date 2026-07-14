import { makeAutoObservable, runInAction } from "mobx";
import { activityApi } from "../Api/activityApi";
import { inscriptionApi } from "../Api/inscriptionApi";
import type { Activity, ActivityFormValues } from "../Models/Activity";
import type { Inscription, MyInscription } from "../Models/Inscription";
import { authStore } from "./AuthStore";

class ActivityStore {
  activities: Activity[] = [];
  currentActivity: Activity | null = null;
  currentActivityInscriptions: Inscription[] = [];
  myInscriptions: MyInscription[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isRegisteredToCurrent(): boolean {
    const userId = authStore.user?.id;
    if (!userId) return false;
    return this.currentActivityInscriptions.some((i) => i.userId === userId);
  }

  async fetchAll(): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const activities = await activityApi.getAll();
      runInAction(() => {
        this.activities = activities;
      });
    } catch {
      runInAction(() => {
        this.error = "Impossible de charger les activités.";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async fetchById(id: string): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const [activity, inscriptions] = await Promise.all([
        activityApi.getById(id),
        inscriptionApi.getForActivity(id),
      ]);
      runInAction(() => {
        this.currentActivity = activity;
        this.currentActivityInscriptions = inscriptions;
      });
    } catch {
      runInAction(() => {
        this.error = "Activité introuvable.";
        this.currentActivity = null;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async create(values: ActivityFormValues): Promise<string> {
    return activityApi.create(values);
  }

  async register(activityId: string): Promise<void> {
    await inscriptionApi.register(activityId);
    await this.fetchById(activityId);
  }

  async unregister(activityId: string): Promise<void> {
    await inscriptionApi.unregister(activityId);
    await this.fetchById(activityId);
  }

  async fetchMyInscriptions(): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const inscriptions = await inscriptionApi.getMine();
      runInAction(() => {
        this.myInscriptions = inscriptions;
      });
    } catch {
      runInAction(() => {
        this.error = "Impossible de charger tes inscriptions.";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

export const activityStore = new ActivityStore();
