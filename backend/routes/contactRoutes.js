import { Router } from 'express';
import { getContacts,
        postContact,
        getContactsByID,
        updateContactsByID,
        deleteContactByID }
        from '../controllers/contactController.js';

const router = Router();

router.get('/', getContacts)
router.get('/:id',getContactsByID)     
router.post('/', postContact)
router.put('/:id', updateContactsByID)
router.delete('/:id', deleteContactByID)

export default router;