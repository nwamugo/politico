const parties = [];

/**
 * @export
 * @class Party
 */
export default class Party {
  /**
   *Creates an instance of Party.
   * @param {*} details
   * @memberof Party
   */
  constructor(details) {
    this.name = details.name;
    this.hq_address = details.hq_address || '';
    this.logo_url = details.logo_url || '';
    this.party_id = details.party_id || null;
  }

  /**
   * @memberof Party
   */
  save() {
    this.party_id = (function createId() {
      if (!parties[0]) return 0;
      const lastIndex = parties.length - 1;
      const gettingId = parties[lastIndex].party_id;
      const newId = gettingId + 1;
      return newId;
    }());
    parties.push(this);
  }

  /**
   *
   *
   * @memberof Party
   */
  patch() {
    const existingPartyIndex = parties.findIndex(p => p.party_id === parseInt(this.party_id, 10));
    parties[existingPartyIndex] = this;
  }

  /**
   * @static
   * @returns
   * @memberof Party
   */
  static fetchAll() {
    return parties;
  }

  /**
   * @static
   * @param {*} id
   * @returns
   * @memberof Party
   */
  static findById(id) {
    return parties.find(p => p.party_id === parseInt(id, 10));
  }

  static deleteById(id) {
    const partyIndex = parties.findIndex(p => p.party_id === parseInt(this.party_id, 10));
    parties.splice(partyIndex, 1);
  }
}
