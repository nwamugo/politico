const offices = [];

/**
 * @export
 * @class Office
 */
export default class Office {
  /**
   *Creates an instance of Office.
   * @param {*} details
   * @memberof Office
   */
  constructor(details) {
    this.name = details.name;
    this.type = details.type;
    this.office_id = (function createId() {
      if (!offices[0]) {
        return 0;
      }
      const lastIndex = offices.length - 1;
      const gettingId = offices[lastIndex].id;
      const newId = gettingId + 1;
      return newId;
    }());
  }

  /**
   * @memberof Office
   */
  save() {
    offices.push(this);
  }

  /**
   * @static
   * @returns
   * @memberof Office
   */
  static fetchAll() {
    return offices;
  }

  /**
   * @static
   * @param {*} id
   * @returns
   * @memberof Office
   */
  static findById(id) {
    return offices.find(o => o.office_id === parseInt(id, 10));
  }
}
