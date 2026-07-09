import { makeAutoObservable, runInAction } from "mobx";
import { authApi } from "../Api/authApi";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../Common/constants";
import type { LoginDto, RegisterDto } from "../Models/Auth";
import type { User } from "../Models/User";
import { decodeUserFromToken } from "../Services/jwt";

class AuthStore {
  user: User | null = null;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.restoreSession();
  }

  get isAuthenticated(): boolean {
    return this.user !== null;
  }

  restoreSession(): void {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      this.user = decodeUserFromToken(token);
    }
  }

  async login(dto: LoginDto): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const result = await authApi.login(dto);
      this.setSession(result.accessToken, result.refreshToken);
    } catch {
      runInAction(() => {
        this.error = "Email ou mot de passe incorrect.";
      });
      throw new Error("Échec de connexion");
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async register(dto: RegisterDto): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const result = await authApi.register(dto);
      this.setSession(result.accessToken, result.refreshToken);
    } catch {
      runInAction(() => {
        this.error = "Impossible de créer le compte.";
      });
      throw new Error("Échec d'inscription");
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async logout(): Promise<void> {
    try {
      await authApi.logout();
    } finally {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      runInAction(() => {
        this.user = null;
      });
    }
  }

  private setSession(accessToken: string, refreshToken: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    runInAction(() => {
      this.user = decodeUserFromToken(accessToken);
    });
  }
}

export const authStore = new AuthStore();
