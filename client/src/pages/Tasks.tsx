import { useState } from 'react';
import type { Task, NewTask, TaskStatus } from '../types/task';
import { addTask, deleteTask, updateTask } from '../services/taskService';
import TaskForm from '../components/TaskForm';
import TaskFilter from '../components/TaskFilter';
import TaskCard from '../components/TaskCard';
import Loader from '../components/Loader';
import { useCRMData } from '../hooks/useCRMData';
import type { ToastState } from '../types/toast';
import Toast from '../components/Toast';
import axios from 'axios';

function Tasks() {
    const { tasks, setTasks, clients, loader, error } = useCRMData();
    const [filter, setFilter] = useState<'all' | TaskStatus>('all');
    const [form, setForm] = useState<NewTask>({
        title: '',
        status: 'todo',
        clientId: '',
    });
    const [toast, setToast] = useState<ToastState>({
        show: false,
        message: '',
        type: 'success',
    });
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const handleSubmit = async (event: React.SubmitEvent) => {
        event.preventDefault();

        if (!form.title || !form.clientId) return;

        try {
            if (editingTask) {
                const update = await updateTask(editingTask.id, form);
                setTasks(prev =>
                    prev.map(task =>
                        task.id === editingTask.id ? update : task,
                    ),
                );

                setEditingTask(null);
                setToast({
                    show: true,
                    message: 'The task data has been updated successfully',
                    type: 'success',
                });
            } else {
                const newTask = await addTask(form);
                setTasks(prev => [...prev, newTask]);
                setToast({
                    show: true,
                    message: 'The task has been added successfully',
                    type: 'success',
                });
            }

            setForm({
                title: '',
                status: 'todo',
                clientId: '',
            });
        } catch (err) {
            let errorMessage = 'An unexpected error occurred';
            if (axios.isAxiosError(err)) {
                errorMessage =
                    err.response?.data.message ||
                    'Error while working with a task';
            } else {
                console.error('Unknown error:', err);
            }
            setToast({
                show: true,
                message: errorMessage,
                type: 'error',
            });
        }
    };

    const handleDeleteTask = async (id: string) => {
        try {
            await deleteTask(id);
            setTasks(prev => prev.filter(t => t.id !== id));
            setToast({
                show: true,
                message: 'The task has been successfully removed',
                type: 'success',
            });
        } catch (err) {
            let errorMessage = 'An unexpected error occurred';
            if (axios.isAxiosError(err)) {
                errorMessage =
                    err.response?.data.message || 'Failed to delete task';
            } else {
                console.error('Unknown error:', err);
            }
            setToast({
                show: true,
                message: errorMessage,
                type: 'error',
            });
        }
    };

    const filteredTask =
        filter === 'all' ? tasks : tasks.filter(t => t.status === filter);

    const handleChangeStatus = async (
        taskId: string,
        status: TaskStatus,
    ): Promise<void> => {
        try {
            const update = await updateTask(taskId, { status });

            setTasks(prev =>
                prev.map(task =>
                    task.id === taskId
                        ? { ...task, status: update.status }
                        : task,
                ),
            );
            setToast({
                show: true,
                message: 'The task status has been updated successfully',
                type: 'success',
            });
        } catch (err) {
            let errorMessage = 'An unexpected error occurred';
            if (axios.isAxiosError(err)) {
                errorMessage =
                    err.response?.data.message ||
                    'Failed to update task status';
            } else {
                console.error('Unknown error:', err);
            }
            setToast({
                show: true,
                message: errorMessage,
                type: 'error',
            });
        }
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
                        {filteredTask.length === 0 && (
                            <div className="empty-container">
                                No tasks found
                            </div>
                        )}
                    </div>
                </div>
            )}
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(prev => ({ ...prev, show: false }))}
                />
            )}
        </div>
    );
}

export default Tasks;
