import type { Client } from "./clients";
export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
    id: string;
    title: string;
    clientId: string | Client; 
    status: TaskStatus;
};

// export type NewTask = Omit<Task, "id">;

export type NewTask = Omit<Task, "id" | "clientId"> & {
    clientId: string;
};