import type { Client, NewClient } from '../types/clients';
import Loader from './Loader';

type ClientFormProps = {
    form: NewClient;
    setForm: React.Dispatch<React.SetStateAction<NewClient>>;
    handleSubmit: (event: React.SubmitEvent) => void;
    editingClient: Client | null;
    btnLoader: boolean;
};

function ClientForm({
    form,
    setForm,
    handleSubmit,
    editingClient,
    btnLoader,
}: ClientFormProps) {
    return (
        <form className="client-form" onSubmit={handleSubmit}>
            <input
                className="client-form__input"
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <input
                className="client-form__input"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <input
                className="client-form__input"
                type="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
            />
            <button className="client-form__btn" disabled={btnLoader}>
                {btnLoader ? (
                    <Loader />
                ) : editingClient ? (
                    'Save client'
                ) : (
                    'Add client'
                )}
            </button>
        </form>
    );
}

export default ClientForm;
