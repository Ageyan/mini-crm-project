import type { NewClient, Client } from '../types/clients';
import {
    FaUserGear,
    FaUserLargeSlash,
    FaToggleOn,
    FaToggleOff,
} from 'react-icons/fa6';
import Loader from './Loader';

interface ClientContainerProps {
    clients: Client[];
    loader: boolean;
    error: string;
    setForm: React.Dispatch<React.SetStateAction<NewClient>>;
    setEditingClient: React.Dispatch<React.SetStateAction<Client | null>>;
    toggleClientStatus: (client: Client) => Promise<void>;
    handleDeleteClient: (id: string) => Promise<void>;
}

const ClientContainer = ({
    clients,
    loader,
    error,
    setForm,
    setEditingClient,
    toggleClientStatus,
    handleDeleteClient,
}: ClientContainerProps) => {
    return (
        <div className="client-container">
            {loader && <Loader />}
            {error && <div className="error-message">{error}</div>}
            {!loader &&
                !error &&
                clients.map(client => (
                    <div
                        className={`client-container__item-container client-container__item-container--${client.status}`}
                        key={client.id}
                    >
                        <div className="client-container__item-header">
                            <span
                                className={`client-container__status-dot client-container__status-dot--${client.status}`}
                            ></span>
                            <p>{client.name}</p>
                            <button
                                className="client-container__item-btn-status"
                                onClick={() => toggleClientStatus(client)}
                            >
                                {client.status === 'active' ? (
                                    <FaToggleOn className="client-container__icon-btn-status on" />
                                ) : (
                                    <FaToggleOff className="client-container__icon-btn-status off" />
                                )}
                            </button>
                        </div>
                        <p>{client.email}</p>
                        <p>{client.phone}</p>
                        <button
                            className="client-container__item-btn"
                            onClick={() => {
                                setEditingClient(client);
                                setForm({
                                    name: client.name,
                                    email: client.email,
                                    phone: client.phone,
                                    status: client.status,
                                });
                            }}
                        >
                            Edit <FaUserGear style={{ fontSize: '1.1rem' }} />
                        </button>
                        <button
                            className="client-container__item-btn delete"
                            onClick={() => handleDeleteClient(client.id)}
                        >
                            Delete{' '}
                            <FaUserLargeSlash style={{ fontSize: '1.1rem' }} />
                        </button>
                    </div>
                ))}
        </div>
    );
};

export default ClientContainer;
