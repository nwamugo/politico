export default {
  welcome(req, res) {
    res.status(200).json(
      {
        status: 200,
        data: [
          {
            greetings: 'Hey there! Welcome to Duziem\'s Politico API',
            intro: 'I designed this RESTful API with you in mind. And I can assure you it\'s the next best thing since SendIT. Enjoy!',
            post_parties: '/api/v1/parties',
            get_all_parties: '/api/v1/parties',
            get_one_party: '/api/v1/parties/<party-id>',
            patch_party: '/api/v1/parties/<party-id>/name',
            delete_party: '/api/v1/parties/<party-id>',
            post_office: '/api/v1/offices',
            get_all_offices: '/api/v1/offices',
            get_one_office: '/api/v1/offices/<office-id>',
          }
        ]
      }
    );
  }
};
