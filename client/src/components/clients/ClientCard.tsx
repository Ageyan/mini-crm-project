import type { NewClient, Client } from '../../types/clients';
import {
    FaUserGear,
    FaUserLargeSlash,
    FaToggleOn,
    FaToggleOff,
} from 'react-icons/fa6';

interface ClientCardProps {
    client: Client;
    setForm: React.Dispatch<React.SetStateAction<NewClient>>;
    setEditingClient: React.Dispatch<React.SetStateAction<Client | null>>;
    toggleClientStatus: (client: Client) => Promise<void>;
    setIsDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    setIdDeleteClient: React.Dispatch<React.SetStateAction<string | null>>;
}

const ClientCard = ({
    client,
    setForm,
    setEditingClient,
    toggleClientStatus,
    setIsDeleteModal,
    setIdDeleteClient,
}: ClientCardProps) => {
    return (
        <div className={`client-card client-card--${client.status}`}>
            <div className="client-card__header">
                <span
                    className={`client-card__status-dot client-card__status-dot--${client.status}`}
                ></span>
                <p>{client.name}</p>
                <button
                    className="client-card__btn-status"
                    onClick={() => toggleClientStatus(client)}
                >
                    {client.status === 'active' ? (
                        <FaToggleOn className="client-card__icon-btn-status on" />
                    ) : (
                        <FaToggleOff className="client-card__icon-btn-status off" />
                    )}
                </button>
            </div>
            <p>{client.email}</p>
            <p>{client.phone}</p>
            <button
                className="client-card__btn"
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
                className="client-card__btn delete"
                onClick={() => {
                    setIsDeleteModal(true);
                    setIdDeleteClient(client.id);
                }}
            >
                Delete <FaUserLargeSlash style={{ fontSize: '1.1rem' }} />
            </button>
        </div>
    );
};

export default ClientCard;
