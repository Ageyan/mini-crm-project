import api from './api';
import type { Task, NewTask } from '../types/task';

export const getTasks = async (): Promise<Task[]> => {
    const { data } = await api.get<Task[]>('/tasks');
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
