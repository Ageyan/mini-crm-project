import { useState, useEffect } from 'react';
import { getClients } from '../services/clientService';
import { getTasks } from '../services/taskService';
import type { Client } from '../types/clients';
import type { Task } from '../types/task';

function Dashboard() {
    const [clients, setClients] = useState<Client[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Добавляем лоадер

    // useEffect(() => {
    //     getClients().then(setClients);
    //     getTasks().then(setTasks);
    // }, []);

    useEffect(() => {
        // Ждем выполнения обоих запросов
        Promise.all([getClients(), getTasks()])
            .then(([clientsData, tasksData]) => {
                setClients(Array.isArray(clientsData) ? clientsData : []);
                setTasks(Array.isArray(tasksData) ? tasksData : []);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            })
            .finally(() => {
                setLoading(false); // Выключаем лоадер в любом случае
            });
    }, []);

    if (loading) {
        return (
            <div className="dash__loading">
                <h2>Загрузка данных...</h2>
                <p>Пробуждаем сервер базы данных, пожалуйста, подождите.</p>
            </div>
        );
    }

    const activeTasksCount = tasks.filter(t => t.status !== 'done').length;
    const doneTasksCount = tasks.filter(t => t.status === 'done').length;
    const completionRateTasks =
        tasks.length > 0
            ? Math.round((doneTasksCount / tasks.length) * 100)
            : 0;

    const activeClientsCount = clients.filter(
        c => c.status === 'active',
    ).length;
    const completionRateClients =
        clients.length > 0
            ? Math.round((activeClientsCount / clients.length) * 100)
            : 0;

    return (
        <div className="dash">
            <div className="dash__grid">
                <div className="dash-card">
                    <h3 className="dash-card__label">Clients</h3>
                    <div className="dash-card__content">
                        <span className="dash-card__number">
                            {clients.length}
                        </span>
                        <p className="dash-card__desc">Total registered</p>
                    </div>
                </div>
                <div className="dash-card">
                    <h3 className="dash-card__label">Tasks</h3>
                    <div className="dash-card__content">
                        <span className="dash-card__number">
                            {activeTasksCount}
                        </span>
                        <p className="dash-card__desc">Active currently</p>
                    </div>
                </div>
                <div className="dash-card dash-card--accent">
                    <h3 className="dash-card__label">Efficiency Clients</h3>
                    <div className="dash-card__content">
                        <span className="dash-card__number">
                            {completionRateClients}%
                        </span>
                        <div className="dash-card__progress-bar">
                            <div
                                className="dash-card__progress-fill"
                                style={{ width: `${completionRateClients}%` }}
                            ></div>
                        </div>
                        <p className="dash-card__desc">
                            Active clients : {activeClientsCount}/
                            {clients.length}
                        </p>
                    </div>
                </div>
                <div className="dash-card dash-card--accent">
                    <h3 className="dash-card__label">Efficiency Tasks</h3>
                    <div className="dash-card__content">
                        <span className="dash-card__number">
                            {completionRateTasks}%
                        </span>
                        <div className="dash-card__progress-bar">
                            <div
                                className="dash-card__progress-fill"
                                style={{ width: `${completionRateTasks}%` }}
                            ></div>
                        </div>
                        <p className="dash-card__desc">
                            Tasks completed : {doneTasksCount}/{tasks.length}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
