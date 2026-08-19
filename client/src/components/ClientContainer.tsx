import type { NewClient, Client } from '../types/clients';
import Loader from './Loader';
import ClientCard from './ClientCard';

interface ClientContainerProps {
    loader: boolean;
    error: string;
    setForm: React.Dispatch<React.SetStateAction<NewClient>>;
    setEditingClient: React.Dispatch<React.SetStateAction<Client | null>>;
    toggleClientStatus: (client: Client) => Promise<void>;
    handleDeleteClient: (id: string) => Promise<void>;
    searсhClient: Client[];
}

const ClientContainer = ({
    loader,
    error,
    setForm,
    setEditingClient,
    toggleClientStatus,
    handleDeleteClient,
    searсhClient,
}: ClientContainerProps) => {
    return (
        <div className="client-container">
            {loader && <Loader />}
            {error && <div className="error-message">{error}</div>}
            {!loader &&
                !error &&
                searсhClient.map(client => (
                    <ClientCard
                        key={client.id}
                        client={client}
                        setForm={setForm}
                        setEditingClient={setEditingClient}
                        toggleClientStatus={toggleClientStatus}
                        handleDeleteClient={handleDeleteClient}
                    />
                ))}
        </div>
    );
};

export default ClientContainer;
