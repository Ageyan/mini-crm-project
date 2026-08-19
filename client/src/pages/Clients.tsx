import { useEffect, useState } from 'react';
import type { ToastState } from '../types/toast';
import type { NewClient, Client } from '../types/clients';
import {
    getClients,
    addClient,
    updateClient,
    deleteClient,
} from '../services/clientService';
import ClientForm from '../components/ClientForm';
import axios from 'axios';
import Toast from '../components/Toast';
import ClientContainer from '../components/ClientContainer';
import ClientSearch from '../components/ClientSearch';

function Clients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [form, setForm] = useState<NewClient>({
        name: '',
        email: '',
        phone: '',
        status: 'active',
    });
    const [editingClient, setEditingClient] = useState<Client | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [toast, setToast] = useState<ToastState>({
        show: false,
        message: '',
        type: 'success',
    });
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

        if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
            setToast({
                show: true,
                message: 'Please fill in all fields',
                type: 'error',
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setToast({
                show: true,
                message:
                    'Enter the correct email format (for example: user@mail.com)',
                type: 'error',
            });
            return;
        }

        const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/;
        if (!phoneRegex.test(form.phone)) {
            setToast({
                show: true,
                message:
                    'Please enter a valid phone number (minimum 10 digits)',
                type: 'error',
            });
            return;
        }

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
            let errorMessage = 'An unexpected error occurred';
            if (axios.isAxiosError(err)) {
                errorMessage =
                    err.response?.data.message || 'Client form error';
            } else {
                console.error('Unknown error:', err);
            }
            setToast({
                show: true,
                message: errorMessage,
                type: 'error',
            });
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

    const searсhClient = searchTerm.trim()
        ? clients.filter(client =>
              client.name
                  .toLocaleLowerCase()
                  .includes(searchTerm.toLocaleLowerCase()),
          )
        : clients;

    return (
        <div className="clients-page">
            <ClientForm
                form={form}
                setForm={setForm}
                handleSubmit={handleSubmit}
                editingClient={editingClient}
                btnLoader={btnLoader}
            />
            <ClientSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <ClientContainer
                searсhClient={searсhClient}
                loader={loader}
                error={error}
                setForm={setForm}
                setEditingClient={setEditingClient}
                toggleClientStatus={toggleClientStatus}
                handleDeleteClient={handleDeleteClient}
            />
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(prev => ({ ...prev, show: false }))}
                />
            )}
        </div>
    );
}

export default Clients;
