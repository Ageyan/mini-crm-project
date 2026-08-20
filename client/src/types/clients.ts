export type ClientStatus = 'active' | 'inactive';

export interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: ClientStatus;
}

export type NewClient = Omit<Client, 'id'>;
