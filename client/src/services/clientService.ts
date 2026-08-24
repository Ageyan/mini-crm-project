import type { AxiosRequestConfig } from 'axios';

import type { Client, NewClient } from '../types/clients';

import api from './api';

export const getClients = async (config?: AxiosRequestConfig): Promise<Client[]> => {
    const { data } = await api.get<Client[]>('/clients', config);
    return data;
};

export const addClient = async (client: Client): Promise<Client> => {
    const { data } = await api.post<Client>('/clients', client);
    return data;
};

export const deleteClient = async (id: string | null): Promise<void> => {
    await api.delete(`/clients/${id}`);
};

export const updateClient = async (
    id: string,
    client: NewClient,
): Promise<Client> => {
    const { data } = await api.put<Client>(`/clients/${id}`, client);
    return data;
};
