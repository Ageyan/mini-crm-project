import express from 'express';
import * as clientController from '../controllers/clientController.js';

const router = express.Router();

router.post('/', clientController.createClient);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);
router.get('/', clientController.getClients);
router.get('/:id', clientController.getClient);

export default router;
