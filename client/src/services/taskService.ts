import api from './api';
import type { Task, NewTask } from '../types/task';
import type { AxiosRequestConfig } from 'axios';

export const getTasks = async (config? : AxiosRequestConfig): Promise<Task[]> => {
    const { data } = await api.get<Task[]>('/tasks', config);
    return data;
};

export const addTask = async (task: NewTask): Promise<Task> => {
    const { data } = await api.post<Task>('/tasks', task);
    return data;
};

export const deleteTask = async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
};

export const updateTask = async (
    id: string,
    task: Partial<NewTask>,
): Promise<Task> => {
    const { data } = await api.put<Task>(`/tasks/${id}`, task);
    return data;
};
