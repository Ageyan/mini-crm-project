import { useState, useEffect } from 'react';
import { getClients } from '../services/clientService';
import { getTasks } from '../services/taskService';
import type { Client } from '../types/clients';
import type { Task } from '../types/task';
import DashCard from '../components/DashCard';

function Dashboard() {
    const [clients, setClients] = useState<Client[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        Promise.all([getClients(), getTasks()])
            .then(([clientsData, tasksData]) => {
                setClients(Array.isArray(clientsData) ? clientsData : []);
                setTasks(Array.isArray(tasksData) ? tasksData : []);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="dash__loading">
                <h2 className="dash__loading-title">Loading data...</h2>
                <p className="dash__loading-text">
                    Waking up the database server, please wait.
                </p>
            </div>
        );
    }

    const activeTasksCount = tasks.filter(t => t.status !== 'done').length;
    const doneTasksCount = tasks.filter(t => t.status === 'done').length;
    const todoTasksCount = tasks.filter(t => t.status === 'todo').length;
    const inProgressCount = tasks.filter(
        t => t.status === 'in-progress',
    ).length;
    const completionRateTasks =
        tasks.length > 0
            ? Math.round((doneTasksCount / tasks.length) * 100)
            : 0;
    const todoRateTasks =
        tasks.length > 0
            ? Math.round((todoTasksCount / tasks.length) * 100)
            : 0;
    const progressRateTasks =
        tasks.length > 0
            ? Math.round((inProgressCount / tasks.length) * 100)
            : 0;
    const activeClientsCount = clients.filter(
        c => c.status === 'active',
    ).length;
    const completionRateClients =
        clients.length > 0
            ? Math.round((activeClientsCount / clients.length) * 100)
            : 0;

    const cardsData = [
        {
            id: 1,
            label: 'Clients',
            value: clients.length,
            desc: 'Total registered',
        },
        {
            id: 2,
            label: 'Tasks',
            value: activeTasksCount,
            desc: 'Active currently',
        },
        {
            id: 3,
            label: 'Client Retention',
            value: completionRateClients,
            progress: completionRateClients, // Передаем progress!
            desc: `Active clients : ${activeClientsCount}/${clients.length}`,
        },
        {
            id: 4,
            label: 'Task Completion',
            value: completionRateTasks,
            progress: completionRateTasks, // Передаем progress!
            desc: `Tasks completed : ${doneTasksCount}/${tasks.length}`,
        },
        {
            id: 5,
            label: 'Pending Tasks',
            value: todoRateTasks,
            progress: todoRateTasks, // Передаем progress!
            desc: `Tasks todo : ${todoTasksCount}/${tasks.length}`,
        },
        {
            id: 6,
            label: 'Current Workload',
            value: progressRateTasks,
            progress: progressRateTasks, // Передаем progress!
            desc: `Tasks in-progress : ${inProgressCount}/${tasks.length}`,
        },
    ];

    return (
        <div className="dashboard">
            <div className="dashboard__grid">
                {cardsData.map(card => (
                    <DashCard
                        key={card.id}
                        label={card.label}
                        value={card.value}
                        progress={card.progress}
                        desc={card.desc}
                    />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
