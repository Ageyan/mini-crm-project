import type { Task, NewTask } from "../types/task";
import type { Client } from "../types/clients";

type TaskFormProps = {
    form: NewTask;
    setForm: React.Dispatch<React.SetStateAction<NewTask>>;
    handleSubmit: () => void; 
    editingTask: Task | null; 
    clients: Client[];
}

function TaskForm({form, setForm, clients, handleSubmit, editingTask} : TaskFormProps) {

  return (
    <>
        <input
            className="tasks-search-input"
            placeholder="Task title"
            value={form.title}
            onChange={(e) =>
            setForm({ ...form, title: e.target.value })
            }
        />

        <select
            value={form.clientId}
            onChange={(e) => setForm({...form, clientId: e.target.value})}
        >
            <option value={0}>Select client</option>
            {clients.map((c) => (
            <option key={c.id} value={c.id}>
                {c.name}
            </option>
            ))}
        </select>

        <button onClick={handleSubmit}>{editingTask ? "Save task" : "Add task"}</button>
    </>
  )
}

export default TaskForm