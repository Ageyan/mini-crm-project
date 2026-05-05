import type { Client, NewClient } from '../types/clients';
import {
    FaUserGear,
    FaUserLargeSlash,
    FaToggleOn,
    FaToggleOff,
} from 'react-icons/fa6';

type ClientFormProps = {
    form: NewClient;
    setForm: React.Dispatch<React.SetStateAction<NewClient>>;
    handleSubmit: () => void;
    editingClient: Client | null;
    clients: Client[];
    handleDeleteClient: (id: string) => void;
    setEditingClient: React.Dispatch<React.SetStateAction<Client | null>>;
    toggleClientStatus: (client: Client) => void;
};

function ClientForm({
    form,
    setForm,
    handleSubmit,
    editingClient,
    clients,
    handleDeleteClient,
    setEditingClient,
    toggleClientStatus,
}: ClientFormProps) {
    return (
        <div className="client">
            <div className="client__form-container">
                <input
                    className="client__form-input"
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                />
                <input
                    className="client__form-input"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                />
                <input
                    className="client__form-input"
                    type="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                />
                <button className="client__form-btn" onClick={handleSubmit}>
                    {editingClient ? 'Save client' : 'Add client'}
                </button>
            </div>
            <div className="client__container">
                {clients.map(client => (
                    <div
                        className={`client__item-container client__item-container--${client.status}`}
                        key={client.id}
                    >
                        <div className="client__item-header">
                            <span
                                className={`client__status-dot client__status-dot--${client.status}`}
                            ></span>
                            <p>{client.name}</p>
                            <button
                                className="client__item-btn-status"
                                onClick={() => toggleClientStatus(client)}
                            >
                                {client.status === 'active' ? (
                                    <FaToggleOn className="client__icon-btn-status on" />
                                ) : (
                                    <FaToggleOff className="client__icon-btn-status off" />
                                )}
                            </button>
                        </div>
                        <p>{client.email}</p>
                        <p>{client.phone}</p>
                        <button
                            className="client__item-btn"
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
                            className="client__item-btn delete"
                            onClick={() => handleDeleteClient(client.id)}
                        >
                            Delete{' '}
                            <FaUserLargeSlash style={{ fontSize: '1.1rem' }} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ClientForm;
