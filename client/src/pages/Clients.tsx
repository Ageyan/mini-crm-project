import { useEffect, useState } from 'react';
import axios from 'axios';

import type { ToastState } from '../types/toast';
import type { NewClient, Client, ClientStatus } from '../types/clients';
import {
    getClients,
    addClient,
    updateClient,
    deleteClient,
} from '../services/clientService';

import ClientForm from '../components/clients/ClientForm';
import Toast from '../components/common/Toast';
import ClientContainer from '../components/clients/ClientContainer';
import ClientSearch from '../components/clients/ClientSearch';
import ClientDeleteModal from '../components/clients/ClientDeleteModal';
import ClientFilter from '../components/clients/ClientFilter';

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
    const [searchStatus, setSearchStatus] = useState<'all' | ClientStatus>(
        'all',
    );
    const [toast, setToast] = useState<ToastState>({
        show: false,
        message: '',
        type: 'success',
    });
    const [btnLoader, setBtnLoader] = useState<boolean>(false);
    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
    const [idDeleteClient, setIdDeleteClient] = useState<null | string>(null);
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
                setToast({
                    show: true,
                    message: 'Customer data has been updated successfully',
                    type: 'success',
                });
            } else {
                const created = await addClient({
                    ...form,
                    id: generateClientId(),
                });

                setClients(prev => [...prev, created]);
                setToast({
                    show: true,
                    message: 'The client has been added successfully',
                    type: 'success',
                });
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
        try {
            const newStatus =
                client.status === 'active' ? 'inactive' : 'active';
            const updated = await updateClient(client.id, {
                ...client,
                status: newStatus,
            });
            setClients(prev =>
                prev.map(c => (c.id === updated.id ? updated : c)),
            );

            setToast({
                show: true,
                message: 'The client status has been successfully updated',
                type: 'success',
            });
        } catch (err) {
            let errorMessage = 'An unexpected error occurred';
            if (axios.isAxiosError(err)) {
                errorMessage =
                    err.response?.data.message ||
                    'Error changing client status';
            } else {
                console.error('Unknown error:', err);
            }
            setToast({
                show: true,
                message: errorMessage,
                type: 'error',
            });
        }
    };

    const handleDeleteClient = async (id: string | null) => {
        if (!id) return;

        try {
            await deleteClient(id);
            setClients(prev => prev.filter(c => c.id !== id));

            setToast({
                show: true,
                message: 'The client has been successfully removed',
                type: 'success',
            });
        } catch (err) {
            let errorMessage = 'An unexpected error occurred';
            if (axios.isAxiosError(err)) {
                errorMessage =
                    err.response?.data.message || 'Failed to delete client';
            } else {
                console.error('Unknown error:', err);
            }
            setToast({
                show: true,
                message: errorMessage,
                type: 'error',
            });
        } finally {
            setIsDeleteModal(false);
            setIdDeleteClient(null);
        }
    };

    const searchClient = searchTerm.trim()
        ? clients.filter(client =>
              client.name
                  .toLocaleLowerCase()
                  .includes(searchTerm.toLocaleLowerCase()),
          )
        : clients;

    const filterClient =
        searchStatus === 'all'
            ? searchClient
            : searchClient.filter(c => c.status === searchStatus);

    return (
        <div className="clients-page">
            <ClientForm
                form={form}
                setForm={setForm}
                handleSubmit={handleSubmit}
                editingClient={editingClient}
                btnLoader={btnLoader}
            />
            <div className="clients-page__filter-container">
                <ClientSearch
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
                <ClientFilter
                    setSearchStatus={setSearchStatus}
                    searchStatus={searchStatus}
                />
            </div>
            <ClientContainer
                filterClient={filterClient}
                loader={loader}
                error={error}
                setForm={setForm}
                setEditingClient={setEditingClient}
                toggleClientStatus={toggleClientStatus}
                setIsDeleteModal={setIsDeleteModal}
                setIdDeleteClient={setIdDeleteClient}
            />
            {isDeleteModal && (
                <ClientDeleteModal
                    setIsDeleteModal={setIsDeleteModal}
                    setIdDeleteClient={setIdDeleteClient}
                    handleDeleteClient={handleDeleteClient}
                    idDeleteClient={idDeleteClient}
                />
            )}
            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(prev => ({ ...prev, show: false }))}
            />
        </div>
    );
}

export default Clients;
