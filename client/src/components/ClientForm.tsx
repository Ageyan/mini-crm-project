import type { Client, NewClient } from "../types/clients"

type ClientFormProps = {
  form: NewClient;
  setForm: React.Dispatch<React.SetStateAction<NewClient>>;
  handleSubmit: () => void;
  editingClient: Client | null;
  clients: Client[];
  handleDeleteClient: (id: string) => void;
  setEditingClient: React.Dispatch<React.SetStateAction<Client | null>>;
};

function ClientForm({ form, setForm, handleSubmit, editingClient, clients, handleDeleteClient, setEditingClient } : ClientFormProps) {

  return (
    <>
        <div className="client-form-container">
            <input
                className="client-form-input"
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
            />

            <input
                className="client-form-input"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
            />

            <input
                className="client-form-input"
                type="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({...form, phone: e.target.value})}
            />

            <button className="client-form-btn" onClick={handleSubmit}>{editingClient ? "Save client" : "Add client"}</button>
        </div>
        
        <div className="client-container">
            {clients.map((client) => (
                <div className="client-item-container" key={client.id}>
                    <p>{client.name}</p>
                    <p>{client.email}</p>
                    <p>{client.phone}</p>
                    <button className="client-item-btn" onClick={() => handleDeleteClient(client.id)}>Delete</button>
                    <button className="client-item-btn" onClick={() => setEditingClient(client)}>Edit</button>
                </div>
            ))}
        </div>
        
    </>
  )
}

export default ClientForm


