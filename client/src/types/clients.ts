
export type Clientstatus = 'active' | 'unactive';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
}

export type NewClient = Omit<Client, "id">;