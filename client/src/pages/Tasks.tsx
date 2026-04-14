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

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        status: editingTask.status,
        clientId:
          typeof editingTask.clientId === 'string'
            ? editingTask.clientId
            : editingTask.clientId.id,
      });
    }
  }, [editingTask]);    

  const handleSubmit = async() => {
    if (!form.title || !form.clientId) return;

    if (editingTask) {
      await updateTask(editingTask.id, form);

      const updatedTasks = await getTasks();
      setTasks(updatedTasks);

      setEditingTask(null);
  } else {
      await addTask(form);

      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
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

  // const getClientName = (clientId: string) => {
  //   const client = clients.find((c) => c.id === clientId);
  //   return client ? client.name : "Unknown client";
  // };

  const handleChangeStatus = async(taskId: string, status: TaskStatus) : Promise<void> => {
    await updateTask(taskId, { status });

    const updatedTasks = await getTasks();
    setTasks(updatedTasks);
  };

  return (
    <div>
      <TaskForm form={form} setForm={setForm} clients={clients} handleSubmit={handleSubmit} editingTask={editingTask}/>
      <div className="tasks-container">
        <TaskItem setFilter={setFilter} filter={filter}/>
        <div className="tasks-form-container">
          
          {filteredTask.map((task) => (
            <div key={task.id} className="task-item-container">
              <p>{task.title}</p>
              <p>Status: {task.status}</p>
              <p>
                Client: {
                  typeof task.clientId === 'string'
                    ? "Unknown client"
                    : task.clientId.name
                }
              </p>
              <button className="task-item-btn" onClick={() => handleDeleteTask(task.id)}>Delete</button>
              <button className="task-item-btn" onClick={() => setEditingTask(task)}>Edit</button>
              <button onClick={() => handleChangeStatus(task.id, 'done')}>Done</button>
              <button onClick={() => handleChangeStatus(task.id, 'in-progress')}>In Progress</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks;