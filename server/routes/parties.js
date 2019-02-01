import { Router } from 'express';

import partiesController from '../controllers/partiesController';

const router = Router();


// POST /parties
router.post('/', partiesController.postNewParty);

// GET /parties
router.get('/', partiesController.getAllParties);

// GET /parties/:party_id
router.get('/:party_id', partiesController.getOneParty);

// PATCH /parties/:party_id/name
// router.patch('/:party_id/name', partiesController.patchParty);

// DELETE /parties/:party_id
// router.delete('/:party_id', partiesController.deleteAParty);

export default router;
