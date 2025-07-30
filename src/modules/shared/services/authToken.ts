interface JWTPayload {
  userUID: string;
  email: string;
  name: string;
  role: string;
  exp: number;
}

const TOKEN_KEY = 'neomedi_access_token';
const REFRESH_TOKEN_KEY = 'neomedi_refresh_token';

export const authToken = {
  getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string): void {
    sessionStorage.setItem(TOKEN_KEY, token);
  },

  getRefreshToken(): string | null {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setRefreshToken(token: string): void {
    sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  clearTokens(): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])) as JWTPayload;
      return Date.now() >= payload.exp * 1000;
    } catch {
      return true;
    }
  },

  getPayload(): JWTPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return JSON.parse(atob(token.split('.')[1])) as JWTPayload;
    } catch {
      return null;
    }
  }
};