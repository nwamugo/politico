import Party from '../models/party';

export default {
  postNewParty(req, res) {
    const party = new Party(req.body);
    party.save();
    res.status(201).json(
      {
        status: 201,
        data: [party],
      }
    );
  },

  patchParty(req, res) {
    const id = req.params.party_id;
    const party = Party.findById(id);
    if (!party) {
      return res.status(404).json(
        {
          status: 404,
          error: 'Party not found',
        }
      );
    }
    const editedParty = new Party(req.body);
    editedParty.patch();
    res.status(202).json(
      {
        status: 202,
        data: [editedParty],
      }
    );
  },

  getAllParties(req, res) {
    const parties = Party.fetchAll();
    res.status(200).json(
      {
        status: 200,
        data: parties,
      }
    );
  },

  getOneParty(req, res) {
    const id = req.params.party_id;
    const party = Party.findById(id);
    if (!party) {
      return res.status(404).json(
        {
          status: 404,
          error: 'Party not found',
        }
      );
    }
    res.status(200).json(
      {
        status: 200,
        data: [party],
      }
    );
  },

  deleteAParty(req, res) {
    const id = req.params.party_id;
    const party = Party.findById(id);
    if (!party) {
      return res.status(404).json(
        {
          status: 404,
          error: 'Party not found',
        }
      );
    }
    Party.deleteById(id);
    res.status(200).json(
      {
        status: 200,
        message: 'Party successfully deleted',
      }
    );
  }
};
