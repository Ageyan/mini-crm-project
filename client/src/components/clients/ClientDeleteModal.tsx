import { useModalClose } from '../../hooks/useModalClose';

interface ClientDeleteModal {
    isDeleteModal: boolean;
    setIsDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    setIdDeleteClient: React.Dispatch<React.SetStateAction<string | null>>;
    handleDeleteClient: (id: string | null) => Promise<void>;
    idDeleteClient: string | null;
}

const ClientDeleteModal = ({
    isDeleteModal,
    setIsDeleteModal,
    setIdDeleteClient,
    handleDeleteClient,
    idDeleteClient,
}: ClientDeleteModal) => {
    useModalClose(isDeleteModal, () => setIsDeleteModal(false));

    return (
        <div
            className={`client-delete__backdrop ${isDeleteModal ? 'show' : ''}`}
            onClick={() => {
                setIsDeleteModal(false);
                setIdDeleteClient(null);
            }}
        >
            <div
                className="client-delete__modal"
                onClick={e => e.stopPropagation()}
            >
                <button
                    className="client-delete__cancel-btn"
                    onClick={() => {
                        setIsDeleteModal(false);
                        setIdDeleteClient(null);
                    }}
                >
                    X
                </button>
                <h2>Delete client</h2>
                <p>
                    If you delete a client, all tasks associated with it will
                    also be deleted. Do you really want to continue deleting?
                </p>
                <button
                    className="client-delete__btn"
                    onClick={() => handleDeleteClient(idDeleteClient)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ClientDeleteModal;
