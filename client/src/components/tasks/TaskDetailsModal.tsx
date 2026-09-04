import { useModalClose } from '../../hooks/useModalClose';
import type { Task } from '../../types/task';

interface TaskDetailsModalProps {
    detailsModal: boolean;
    setDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
    setTask: React.Dispatch<React.SetStateAction<Task | null>>;
    task: Task | null;
}

export const TaskDetailsModal = ({
    detailsModal,
    setDetailsModal,
    setTask,
    task,
}: TaskDetailsModalProps) => {
    useModalClose(detailsModal, () => {
        setDetailsModal(false);
        setTask(null);
    });

    if (!detailsModal || !task) return null;

    return (
        <div
            className={`task-details-modal__backdrop ${detailsModal ? 'show' : ''}`}
            onClick={() => {
                setDetailsModal(false);
                setTask(null);
            }}
        >
            <div
                className="task-details-modal__container"
                onClick={e => e.stopPropagation()}
            >
                <button
                    className="task-details-modal__cancel-btn"
                    onClick={() => {
                        setDetailsModal(false);
                        setTask(null);
                    }}
                >
                    ✕
                </button>

                <h2>{task.title}</h2>

                <div className="task-details-modal__content">
                    <p className="task-details-modal__status">
                        <strong>Status:</strong> <span>{task.status}</span>
                    </p>
                    <p className="task-details-modal__status">
                        <strong>Client:</strong>{' '}
                        <span>
                            {typeof task.clientId === 'string' || !task.clientId
                                ? 'Unknown client'
                                : task.clientId.name}
                        </span>
                    </p>
                    <p className="task-details-modal__label">
                        <strong>Description:</strong>
                    </p>
                    <p className="task-details-modal__desc">
                        {task.description || 'No description provided.'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailsModal;
