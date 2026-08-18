import { useState } from 'react';
import type { Task, NewTask, TaskStatus } from '../types/task';
import { addTask, deleteTask, updateTask } from '../services/taskService';
import TaskForm from '../components/TaskForm';
import TaskFilter from '../components/TaskFilter';
import TaskCard from '../components/TaskCard';
import Loader from '../components/Loader';
import { useCRMData } from '../hooks/useCRMData';

function Tasks() {
    const { tasks, setTasks, clients, loader, error } = useCRMData();
    const [filter, setFilter] = useState<'all' | TaskStatus>('all');
    const [form, setForm] = useState<NewTask>({
        title: '',
        status: 'todo',
        clientId: '',
    });
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const handleSubmit = async (event: React.SubmitEvent) => {
        event.preventDefault();

        if (!form.title || !form.clientId) return;

        if (editingTask) {
            const update = await updateTask(editingTask.id, form);
            setTasks(prev =>
                prev.map(task => (task.id === editingTask.id ? update : task)),
            );

            setEditingTask(null);
        } else {
            const newTask = await addTask(form);
            setTasks(prev => [...prev, newTask]);
        }

        setForm({
            title: '',
            status: 'todo',
            clientId: '',
        });
    };

    const handleDeleteTask = async (id: string) => {
        await deleteTask(id);
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    const filteredTask =
        filter === 'all' ? tasks : tasks.filter(t => t.status === filter);

    const handleChangeStatus = async (
        taskId: string,
        status: TaskStatus,
    ): Promise<void> => {
        const update = await updateTask(taskId, { status });

        setTasks(prev =>
            prev.map(task =>
                task.id === taskId ? { ...task, status: update.status } : task,
            ),
        );
    };

    return (
        <div className="tasks">
            <TaskForm
                form={form}
                setForm={setForm}
                clients={clients}
                handleSubmit={handleSubmit}
                editingTask={editingTask}
            />
            {error && <div className="error-message">{error}</div>}
            {loader && <Loader />}
            {!error && !loader && (
                <div className="tasks__container">
                    <TaskFilter setFilter={setFilter} filter={filter} />
                    <div className="tasks__grid-container">
                        {filteredTask.map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                setForm={setForm}
                                setEditingTask={setEditingTask}
                                handleDeleteTask={handleDeleteTask}
                                handleChangeStatus={handleChangeStatus}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Tasks;
