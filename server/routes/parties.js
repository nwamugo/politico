import { Router } from 'express';

import partiesController from '../controllers/partiesController';
import Auth from '../auth/auth';

const router = Router();


// POST /parties
router.post('/', Auth.verifyToken, partiesController.postNewParty);

// GET /parties
router.get('/', Auth.verifyToken, partiesController.getAllParties);

// GET /parties/:party_id
router.get('/:party_id', Auth.verifyToken, partiesController.getOneParty);

// PATCH /parties/:party_id/name
router.patch('/:party_id/name', Auth.verifyToken, partiesController.patchParty);

// DELETE /parties/:party_id
router.delete('/:party_id', Auth.verifyToken, partiesController.deleteAParty);

export default router;
