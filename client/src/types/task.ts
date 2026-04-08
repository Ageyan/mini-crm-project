
export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
    id: string;
    title: string;
    clientId: string; 
    status: TaskStatus;
};

export type NewTask = Omit<Task, "id">;