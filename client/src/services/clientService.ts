import api from "./api";
import type { Client, NewClient } from "../types/clients";

export const getClients = async (): Promise<Client[]> => {
  const { data } = await api.get<Client[]>("/clients");
  return data;
};

export const addClient = async (
  client: Client
): Promise<Client> => {
  const { data } = await api.post<Client>("/clients", client);
  return data;
};

export const deleteClient = async (id: string): Promise<void> => {
  await api.delete(`/clients/${id}`);
};

export const updateClient = async ( id: string, client: NewClient): Promise<Client> => {
  const { data } = await api.put<Client>(`/clients/${id}`, client);
  return data;
}