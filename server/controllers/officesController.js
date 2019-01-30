import Office from '../models/office';

export default {
  postNewOffice(req, res) {
    const office = new Office(req.body);
    office.save();
    res.status(201).json(
      {
        status: 201,
        data: [office],
      }
    );
  },

  getAllOffices(req, res) {
    const offices = Office.fetchAll();
    res.status(200).json(
      {
        status: 200,
        data: offices,
      }
    );
  },

  getOneOffice(req, res) {
    const id = req.params.office_id;
    const office = Office.findById(id);
    if (!office) {
      return res.status(404).json(
        {
          status: 404,
          error: 'Office not found',
        }
      );
    }
    res.status(200).json(
      {
        status: 200,
        data: [office],
      }
    );
  },
};
