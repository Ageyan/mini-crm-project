import { FaSearch } from 'react-icons/fa';

interface ClientSearchProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const ClientSearch = ({ searchTerm, setSearchTerm }: ClientSearchProps) => {
    return (
        <div className="client-search">
            <FaSearch className="client-search__icon" />
            <input
                className="client-search__input"
                type="text"
                placeholder="Enter client name..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </div>
    );
};

export default ClientSearch;
