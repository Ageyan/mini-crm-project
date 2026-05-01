import Client from "../models/Client.js";

export const createClient = async(req, res) => {
    try {
        const { name, email, phone } = req.body;

        const clientObj = {
            name, 
            email,
            phone
        }

        const client = await Client.create(clientObj);

        return res.status(201).json(client)
    } catch (e) {
        res.status(400).json({message: 'Failed to create the client'})
    }
};

export const updateClient = async(req, res) => {
    try {
        const clientId = req.params.id;

        const client = await Client.findByIdAndUpdate(
            clientId,
            req.body,
            { returnDocument: 'after', runValidators: true }
        );

        if(!client) {
            return res.status(404).json({message: 'Client not found'});
        }

        return res.status(200).json(client);
    } catch (e) {
        res.status(400).json({ message: 'Failed to update the client' });
    }
};

export const deleteClient = async(req, res) => {
    try {
        const clientId = req.params.id;

        const client = await Client.findByIdAndDelete(clientId);

        if(!client) {
            return res.status(404).json({message: 'Client not found'});
        }

        return res.status(200).json({message: 'Client deleted successfully'})
    } catch (e) {
        res.status(400).json({ message: 'Failed to delete the client' });
    }
};

export const getClients = async(req, res) => {
    try {
        const clients = await Client.find();

        return res.status(200).json(clients);
    } catch (e) {
        // res.status(400).json({ message: 'Failed to fetch clients' });
        console.error("DETAILED ERROR:", error); 
        res.status(400).json({ message: error.message });
    }
};

export const getClient = async(req, res) => {
    try {
        const clientId = req.params.id;

        const client = await Client.findById(clientId)

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        return res.status(200).json(client)
    } catch (e) {
        res.status(400).json({ message: 'Failed to fetch client' });
    }
};