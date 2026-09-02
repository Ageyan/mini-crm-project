type ClientStatus = 'active' | 'inactive';

export interface IClient {
    name: string;
    email: string;
    phone: string;
    status: ClientStatus;
    createdAt?: Date;
    updatedAt?: Date;
}