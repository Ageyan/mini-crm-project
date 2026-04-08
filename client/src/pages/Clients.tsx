import { useEffect, useState } from "react";
import type { NewClient, Client } from "../types/clients";
import {
  getClients,
  addClient,
  deleteClient,
  updateClient
} from "../services/clientService";
import ClientForm from "../components/ClientForm"

function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [form, setForm] = useState<NewClient>({
    name: '',
    email: '', 
    phone: '', 
    status: 'active'
  })
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  useEffect(() => {
    getClients().then(setClients);
  },[]);

  useEffect(() => {
    if(editingClient) {
      setForm({
        name: editingClient.name,
        email: editingClient.email, 
        phone: editingClient.phone, 
        status: editingClient.status
      })
    }
  }, [editingClient])

  // const handleAddClient = async() => {
  //   const newClient: NewClient = {
  //     name: "New Client",
  //     email: "new@gamail.com",
  //     phone: "38098000000", 
  //     status: "active"
  //   }

  //   const createdClient = await addClient(newClient);
  //   setClients((prev) => [...prev, createdClient]);
  // };

  const handleDeleteClient = async (id: string) => {
    await deleteClient(id);
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  const generateClientId = () => crypto.randomUUID(); 

  const handleSubmit = async () => {
    if (editingClient) {
      const updated = await updateClient(editingClient.id, form);
      setClients((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      setEditingClient(null);
    } else {
      const created = await addClient({
        ...form,
        id: generateClientId(),
      });

      setClients((prev) => [...prev, created]);
    }

    setForm({
      name: "",
      email: "",
      phone: "",
      status: "active",
    });
  };

  return (
    <>
      <ClientForm form={form} setForm={setForm} handleSubmit={handleSubmit} editingClient={editingClient} clients={clients} handleDeleteClient={handleDeleteClient}  setEditingClient={setEditingClient}/>
    </>
  )
}

export default Clients;