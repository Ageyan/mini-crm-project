import { useCRMData } from '../hooks/useCRMData';

import DashCard from '../components/DashCard';
import Loader from '../components/common/Loader';

function Dashboard() {
    const { tasks, clients, loader, error } = useCRMData();

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
            progress: completionRateClients,
            desc: `Active clients : ${activeClientsCount}/${clients.length}`,
        },
        {
            id: 4,
            label: 'Task Completion',
            value: completionRateTasks,
            progress: completionRateTasks,
            desc: `Tasks completed : ${doneTasksCount}/${tasks.length}`,
        },
        {
            id: 5,
            label: 'Pending Tasks',
            value: todoRateTasks,
            progress: todoRateTasks,
            desc: `Tasks todo : ${todoTasksCount}/${tasks.length}`,
        },
        {
            id: 6,
            label: 'Current Workload',
            value: progressRateTasks,
            progress: progressRateTasks,
            desc: `Tasks in-progress : ${inProgressCount}/${tasks.length}`,
        },
    ];

    return (
        <div className="dashboard">
            {error && <div className="error-message">{error}</div>}
            {loader && <Loader />}
            {!error && !loader && (
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
            )}
        </div>
    );
}

export default Dashboard;
