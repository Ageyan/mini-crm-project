import { useEffect, useState } from 'react';
import type { NewClient, Client } from '../types/clients';
import {
    getClients,
    addClient,
    updateClient,
    deleteClient,
} from '../services/clientService';
import ClientForm from '../components/ClientForm';
import axios from 'axios';
import ClientContainer from '../components/ClientContainer';

function Clients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [form, setForm] = useState<NewClient>({
        name: '',
        email: '',
        phone: '',
        status: 'active',
    });
    const [editingClient, setEditingClient] = useState<Client | null>(null);
    const [btnLoader, setBtnLoader] = useState<boolean>(false);
    const [loader, setLoader] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const getAllClients = async () => {
            setLoader(true);
            setError('');

            try {
                const res = await getClients();
                setClients(res);
            } catch (err) {
                let errorMessage = 'An unexpected error occurred';

                if (axios.isAxiosError(err)) {
                    errorMessage =
                        err.response?.data.message ||
                        'Error updating user list';
                }

                setError(errorMessage);
            } finally {
                setLoader(false);
            }
        };
        getAllClients();
    }, []);

    const generateClientId = () => crypto.randomUUID();

    const handleSubmit = async (event: React.SubmitEvent) => {
        event.preventDefault();
        setBtnLoader(true);
        try {
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
        } catch (err) {
            console.error('Error message:', err);
        } finally {
            setBtnLoader(false);
        }
    };

    const toggleClientStatus = async (client: Client) => {
        const newStatus = client.status === 'active' ? 'inactive' : 'active';
        const updated = await updateClient(client.id, {
            ...client,
            status: newStatus,
        });
        setClients(prev => prev.map(c => (c.id === updated.id ? updated : c)));
    };

    const handleDeleteClient = async (id: string) => {
        await deleteClient(id);
        setClients(prev => prev.filter(c => c.id !== id));
    };

    return (
        <div className="client">
            <ClientForm
                form={form}
                setForm={setForm}
                handleSubmit={handleSubmit}
                editingClient={editingClient}
                btnLoader={btnLoader}
            />
            <ClientContainer
                clients={clients}
                loader={loader}
                error={error}
                setForm={setForm}
                setEditingClient={setEditingClient}
                toggleClientStatus={toggleClientStatus}
                handleDeleteClient={handleDeleteClient}
            />
        </div>
    );
}

export default Clients;
