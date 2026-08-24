import type { Task, NewTask, TaskStatus } from '../types/task';

interface TaskCardProps {
    task: Task;
    setForm: React.Dispatch<React.SetStateAction<NewTask>>;
    setEditingTask: React.Dispatch<React.SetStateAction<Task | null>>;
    handleDeleteTask: (id: string) => Promise<void>;
    handleChangeStatus: (taskId: string, status: TaskStatus) => Promise<void>;
}

const TaskCard = ({
    task,
    setForm,
    setEditingTask,
    handleDeleteTask,
    handleChangeStatus,
}: TaskCardProps) => {
    return (
        <div className={`task-card task-card--${task.status}`}>
            <p className="task-card__title">{task.title}</p>
            <p className="task-card__text">Status: {task.status}</p>
            <p className="task-card__text">
                Client:{' '}
                {typeof task.clientId === 'string' || !task.clientId
                    ? 'Unknown client'
                    : task.clientId.name}
            </p>
            <button
                className="task-card__btn"
                onClick={() => {
                    setEditingTask(task);
                    setForm({
                        title: task.title,
                        status: task.status,
                        clientId:
                            typeof task.clientId === 'string'
                                ? task.clientId
                                : task.clientId?.id || '',
                    });
                }}
            >
                Edit
            </button>
            <button
                className="task-card__btn del"
                onClick={() => handleDeleteTask(task.id)}
            >
                Delete
            </button>
            <div className="task-card__btn-container">
                <button
                    className="task-card__status-btn done"
                    onClick={() => handleChangeStatus(task.id, 'done')}
                >
                    Done
                </button>
                <button
                    className="task-card__status-btn in-progress"
                    onClick={() => handleChangeStatus(task.id, 'in-progress')}
                >
                    In Progress
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
