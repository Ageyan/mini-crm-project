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
    <div style={{'marginBottom': "50px"}}>
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
            className="tasks-select-btn"
        >
            <option value="">Select client</option>
            {clients.map((c) => (
            <option key={c.id} value={c.id}>
                {c.name}
            </option>
            ))}
        </select>

        <button className="task-input-btn" onClick={handleSubmit}>{editingTask ? "Save task" : "Add task"}</button>
    </div>
  )
}

export default TaskForm