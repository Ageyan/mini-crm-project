import type { NewClient, Client } from '../../types/clients';

import Loader from '../common/Loader';
import ClientCard from './ClientCard';

interface ClientContainerProps {
    loader: boolean;
    error: string;
    setForm: React.Dispatch<React.SetStateAction<NewClient>>;
    setEditingClient: React.Dispatch<React.SetStateAction<Client | null>>;
    toggleClientStatus: (client: Client) => Promise<void>;
    filterClient: Client[];
    setIsDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    setIdDeleteClient: React.Dispatch<React.SetStateAction<string | null>>;
}

const ClientContainer = ({
    loader,
    error,
    setForm,
    setEditingClient,
    toggleClientStatus,
    filterClient,
    setIsDeleteModal,
    setIdDeleteClient,
}: ClientContainerProps) => {
    return (
        <div className="client-container">
            {loader && <Loader />}
            {error && <div className="error-message">{error}</div>}
            {!loader &&
                !error &&
                filterClient.length > 0 &&
                filterClient.map(client => (
                    <ClientCard
                        key={client.id}
                        client={client}
                        setForm={setForm}
                        setEditingClient={setEditingClient}
                        toggleClientStatus={toggleClientStatus}
                        setIsDeleteModal={setIsDeleteModal}
                        setIdDeleteClient={setIdDeleteClient}
                    />
                ))}
            {!error && !loader && filterClient.length === 0 && (
                <div className="empty-container">No clients found</div>
            )}
        </div>
    );
};

export default ClientContainer;
