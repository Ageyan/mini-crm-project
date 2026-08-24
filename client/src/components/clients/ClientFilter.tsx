import type { ClientStatus } from '../types/clients';

interface ClientFilterProps {
    setSearchStatus: React.Dispatch<React.SetStateAction<ClientStatus | 'all'>>;
    searchStatus: 'all' | ClientStatus;
}

const ClientFilter = ({ setSearchStatus, searchStatus }: ClientFilterProps) => {
    return (
        <div className="client-filter">
            <button
                className={`client-filter__btn ${searchStatus === 'all' ? 'active' : ''}`}
                onClick={() => setSearchStatus('all')}
            >
                All
            </button>
            <button
                className={`client-filter__btn ${searchStatus === 'active' ? 'active' : ''}`}
                onClick={() => setSearchStatus('active')}
            >
                Active
            </button>
            <button
                className={`client-filter__btn ${searchStatus === 'inactive' ? 'active' : ''}`}
                onClick={() => setSearchStatus('inactive')}
            >
                Inactive
            </button>
        </div>
    );
};

export default ClientFilter;
