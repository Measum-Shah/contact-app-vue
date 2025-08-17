import { Router } from 'express';
import { 
  getContacts,
  postContact,
  getContactsByID,
  updateContactsByID,
  deleteContactByID 
} from '../controllers/contactController.js';
import { authMiddleware } from '../controllers/contactController.js'; // auth middleware

const router = Router();

// Protect all contact routes with authMiddleware
router.use(authMiddleware);

router.get('/', getContacts);
router.get('/:id', getContactsByID);
router.post('/', postContact);
router.put('/:id', updateContactsByID);
router.delete('/:id', deleteContactByID);

export default router;
