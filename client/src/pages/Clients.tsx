import { useEffect, useState } from 'react';
import type { NewClient, Client } from '../types/clients';
import {
    getClients,
    addClient,
    deleteClient,
    updateClient,
} from '../services/clientService';
import ClientForm from '../components/ClientForm';

function Clients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [form, setForm] = useState<NewClient>({
        name: '',
        email: '',
        phone: '',
        status: 'active',
    });
    const [editingClient, setEditingClient] = useState<Client | null>(null);

    useEffect(() => {
        getClients().then(setClients);
    }, []);

    const handleDeleteClient = async (id: string) => {
        await deleteClient(id);
        setClients(prev => prev.filter(c => c.id !== id));
    };

    const generateClientId = () => crypto.randomUUID();

    const handleSubmit = async () => {
        if (editingClient) {
            const updated = await updateClient(editingClient.id, form);
            setClients(prev =>
                prev.map(c => (c.id === updated.id ? updated : c)),
            );
            setEditingClient(null);
        } else {
            const created = await addClient({
                ...form,
                id: generateClientId(),
            });

            setClients(prev => [...prev, created]);
        }

        setForm({
            name: '',
            email: '',
            phone: '',
            status: 'active',
        });
    };

    const toggleClientStatus = async (client: Client) => {
        const newStatus = client.status === 'active' ? 'inactive' : 'active';
        const updated = await updateClient(client.id, {
            ...client,
            status: newStatus,
        });
        setClients(prev => prev.map(c => (c.id === updated.id ? updated : c)));
    };

    return (
        <>
            <ClientForm
                form={form}
                setForm={setForm}
                handleSubmit={handleSubmit}
                editingClient={editingClient}
                clients={clients}
                handleDeleteClient={handleDeleteClient}
                setEditingClient={setEditingClient}
                toggleClientStatus={toggleClientStatus}
            />
        </>
    );
}

export default Clients;
