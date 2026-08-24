import type { Client } from '../types/clients';
import type { NewTask } from '../types/task';

interface TaskSelectProps {
    selectedClient: Client | undefined;
    clients: Client[];
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setForm: React.Dispatch<React.SetStateAction<NewTask>>;
    form: NewTask;
}

const TaskCustomSelect = ({
    selectedClient,
    clients,
    isOpen,
    setIsOpen,
    form,
    setForm,
}: TaskSelectProps) => {
    return (
        <div className="custom-select">
            <div
                className={`custom-select__trigger ${isOpen ? 'open' : ''}`}
                onClick={e => {
                    setIsOpen(!isOpen);
                    e.stopPropagation();
                }}
            >
                <span>
                    {selectedClient ? selectedClient.name : 'Select Client'}
                </span>
                <div className="custom-select__arrow"></div>
            </div>

            {isOpen && (
                <div className="custom-select__options">
                    <div
                        className="custom-select__option"
                        onClick={() => {
                            setForm({ ...form, clientId: '' });
                            setIsOpen(false);
                        }}
                    >
                        Select client (none)
                    </div>
                    {clients.map(c => (
                        <div
                            key={c.id}
                            className="custom-select__option"
                            onClick={() => {
                                setForm({ ...form, clientId: c.id });
                                setIsOpen(false);
                            }}
                        >
                            {c.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskCustomSelect;
