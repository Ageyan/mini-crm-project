import { useState, useEffect } from 'react';
import type { Task, NewTask } from '../../types/task';
import type { Client } from '../../types/clients';
import TaskCustomSelect from './TaskCustomSelect';

type TaskFormProps = {
    form: NewTask;
    setForm: React.Dispatch<React.SetStateAction<NewTask>>;
    handleSubmit: (event: React.SubmitEvent) => void;
    editingTask: Task | null;
    clients: Client[];
};

function TaskForm({
    form,
    setForm,
    clients,
    handleSubmit,
    editingTask,
}: TaskFormProps) {
    const [isOpen, setIsOpen] = useState(false);

    const selectedClient = clients.find(c => c.id === form.clientId);

    useEffect(() => {
        const closeSelect = () => setIsOpen(false);
        if (isOpen) window.addEventListener('click', closeSelect);
        return () => window.removeEventListener('click', closeSelect);
    }, [isOpen]);

    return (
        <form className="tasks-form" onSubmit={handleSubmit}>
            <input
                className="tasks-form__input"
                placeholder="Task title"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
            />
            <TaskCustomSelect
                selectedClient={selectedClient}
                clients={clients}
                setForm={setForm}
                form={form}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            <button type="submit" className="tasks-form__btn">
                {editingTask ? 'Save task' : 'Add task'}
            </button>
        </form>
    );
}

export default TaskForm;
