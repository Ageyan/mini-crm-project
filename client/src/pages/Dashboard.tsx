import { useEffect, useState } from "react";
import type { Client } from "../types/clients";
import type { Task } from "../types/task";
import { getClients } from "../services/clientService";
import { getTasks } from "../services/taskService";


function Dashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getClients().then(setClients);
    getTasks().then(setTasks);
  }, [])

  return (
    <>
      {/* <h2 className="page-title">Dashboard</h2> */}

      <div className="dash-container">
        <ul className="dash-list">
          <li><p className="dash-text">Total clients: {clients.length}</p></li>
          <li>
            <p className="dash-text">
              Active clients: {" "}
              {clients.filter((c) => c.status === 'active').length}
            </p>
          </li>
          <li><p className="dash-text">Total tasks: {tasks.length}</p></li>
          <li>
            <p className="dash-text">
              Active tasks: {" "}
              {tasks.filter((t) => t.status === 'done').length}
            </p>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Dashboard;