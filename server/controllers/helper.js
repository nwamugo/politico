export default {
  partyIdFail(req) {
    return req.params.party_id % 1 !== 0 || parseInt(req.params.party_id, 10) < 1;
  },

  officeIdFail(req) {
    return req.params.office_id % 1 !== 0 || parseInt(req.params.office_id, 10) < 1;
  }
};
