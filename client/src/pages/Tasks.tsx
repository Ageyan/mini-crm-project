import { useEffect, useState } from "react";
import type { Task, NewTask, TaskStatus} from "../types/task";
import type { Client } from "../types/clients";
import { getTasks, addTask, deleteTask, updateTask } from "../services/taskService";
import { getClients } from "../services/clientService";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | TaskStatus>("all");
  const [form, setForm] = useState<NewTask>({
    title: "",
    status: "todo",
    clientId: ""
  });
  const [clients, setClients] = useState<Client[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    getTasks().then(setTasks);
    getClients().then(setClients);
  }, []);

  useEffect(()=> {
    if(editingTask) {
      setForm({
        title: editingTask.title,
        status: editingTask.status,
        clientId: editingTask.clientId,
      })
    }
  }, [editingTask])

  const handleSubmit = async() => {
    if (!form.title || !form.clientId) return;

    if(editingTask) {
      const updated = await updateTask(
        editingTask.id, form
      );

      setTasks((prev) => prev.map((t) => t.id === updated.id ? updated : t));
      setEditingTask(null);
    } else {
      const created = await addTask(form);
      setTasks((prev) => [...prev, created]);
    }

    setForm({
      title: "",
      status: "todo",
      clientId: "",
    });
  };

  const handleDeleteTask = async(id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const filteredTask = filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  const getClientName = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId);
    return client ? client.name : "Unknown client";
  };

  return (
    <div className="tasks-container">
      <TaskItem setFilter={setFilter} filter={filter}/>
      <div className="tasks-form-container">
        <TaskForm form={form} setForm={setForm} clients={clients} handleSubmit={handleSubmit} editingTask={editingTask}/>

        {filteredTask.map((task) => (
          <div key={task.id}>
            <p>{task.title}</p>
            <p>Status: {task.status}</p>
            <p>Client: {getClientName(task.clientId)}</p>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            <button onClick={() => setEditingTask(task)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tasks;