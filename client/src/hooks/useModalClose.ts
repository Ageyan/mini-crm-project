import { useEffect } from "react"

export const useModalClose = (isOpen: boolean, onClose: () => void) => {
    useEffect(() => {
        if (!isOpen) return;

        document.body.style.overflow = 'hidden';

        const handleClose = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', handleClose);

        return () => {
            document.body.style.overflow = 'auto';
            document.removeEventListener('keydown', handleClose);
        }
    }, [isOpen, onClose])
}