import { useState, useEffect } from 'react';
import type { Task, NewTask } from '../types/task';
import type { Client } from '../types/clients';

type TaskFormProps = {
    form: NewTask;
    setForm: React.Dispatch<React.SetStateAction<NewTask>>;
    handleSubmit: () => void;
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
        <div className="tasks-form">
            <input
                className="tasks-form__input"
                placeholder="Task title"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
            />
            <div className="custom-select">
                <div
                    className={`custom-select__trigger ${isOpen ? 'open' : ''}`}
                    onClick={e => {
                        setIsOpen(!isOpen);
                        e.stopPropagation();
                    }}
                >
                    <span>
                        {selectedClient ? selectedClient.name : 'Select Client'}
                    </span>
                    <div className="custom-select__arrow"></div>
                </div>

                {isOpen && (
                    <div className="custom-select__options">
                        <div
                            className="custom-select__option"
                            onClick={() => {
                                setForm({ ...form, clientId: '' });
                                setIsOpen(false);
                            }}
                        >
                            Select client (none)
                        </div>
                        {clients.map(c => (
                            <div
                                key={c.id}
                                className="custom-select__option"
                                onClick={() => {
                                    setForm({ ...form, clientId: c.id });
                                    setIsOpen(false);
                                }}
                            >
                                {c.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <button className="tasks-form__btn" onClick={handleSubmit}>
                {editingTask ? 'Save task' : 'Add task'}
            </button>
        </div>
    );
}

export default TaskForm;
