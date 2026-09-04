import { useState, useEffect } from 'react';
import axios from 'axios';

import { getTasks } from '../services/taskService';
import { getClients } from '../services/clientService';
import type { Task } from '../types/task';
import type { Client } from '../types/clients';

export const useCRMData = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [loader, setLoader] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const controller = new AbortController();
        
        const getInfo = async () => {
            setError('');
            setLoader(true);
            try {
                const [clientsInfo, tasksInfo] = await Promise.all([
                    getClients({ signal: controller.signal }),
                    getTasks({ signal: controller.signal }),
                ]);
                setClients(Array.isArray(clientsInfo) ? clientsInfo : []);
                setTasks(Array.isArray(tasksInfo) ? tasksInfo : []);
            } catch (err) {
                if (axios.isCancel(err)) return;

                let errorMessage = 'An unexpected error occurred';
                if (axios.isAxiosError(err)) {
                    errorMessage = err.response?.data.message || 'Error updating data';
                }
                setError(errorMessage);
            } finally {
                if (!controller.signal.aborted) {
                    setLoader(false);
                }
            }
        };
        
        getInfo();

        return () => controller.abort();
    }, []);

    return { tasks, setTasks, clients, setClients, loader, error };
};