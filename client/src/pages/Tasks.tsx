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

  const handleChangeStatus = async(taskId: string, status: TaskStatus) : Promise<void> => {
    await updateTask(taskId, { status });

    const updatedTasks = await getTasks();
    setTasks(updatedTasks);
  };

  return (
    <div className="tasks">
      <TaskForm form={form} setForm={setForm} clients={clients} handleSubmit={handleSubmit} editingTask={editingTask}/>
      <div className="tasks__container">
        <TaskItem setFilter={setFilter} filter={filter}/>
        <div className="tasks__form-container">
          
          {filteredTask.map((task) => (
            <div key={task.id} className={`tasks__item-container tasks__item-container--${task.status}`}>
              <p className="tasks__item-title">{task.title}</p>
              <p className="tasks__item-text">Status: {task.status}</p>
              <p className="tasks__item-text">
                Client: {
                  typeof task.clientId === 'string'
                    ? "Unknown client"
                    : task.clientId.name
                }
              </p>
              <button className="tasks__item-btn" onClick={() => {
                  setEditingTask(task);
                  setForm({
                    title: task.title,
                    status: task.status,
                    clientId: typeof task.clientId === 'string' 
                      ? task.clientId 
                      : task.clientId.id,
                  });
                }}
              >
                Edit
              </button>
              <button className="tasks__item-btn del" onClick={() => handleDeleteTask(task.id)}>Delete</button>
              <div className="tasks__btn-container">
                <button className="tasks__item-status-btn done" onClick={() => handleChangeStatus(task.id, 'done')}>Done</button>
                <button className="tasks__item-status-btn in-progress" onClick={() => handleChangeStatus(task.id, 'in-progress')}>In Progress</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks;