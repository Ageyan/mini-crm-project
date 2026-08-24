import type { LoginResponse } from "../types/auth";

import api from "./api";

export const handleLogin = async (email: string, password: string): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>('/login', { email, password });
    return data;
}
