"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  welcome: function welcome(req, res) {
    res.status(200).json({
      status: 200,
      data: [{
        greetings: 'Hey there! Welcome to Duziem\'s Politico API',
        intro: 'I designed this RESTful API with you in mind. And I can assure you it\'s the next best thing since SendIT. Enjoy!',
        welcome: '/api/v1/',
        catch_all: '/*',
        post_parties: '/api/v1/parties',
        get_all_parties: '/api/v1/parties',
        get_one_party: '/api/v1/parties/<party-id>',
        patch_party: '/api/v1/parties/<party-id>/name',
        delete_party: '/api/v1/parties/<party-id>',
        post_office: '/api/v1/offices',
        get_all_offices: '/api/v1/offices',
        get_one_office: '/api/v1/offices/<office-id>',
        register_candidate: '/api/v1/office/<user_id>/register',
        vote_a_candidate: '/api/v1/votes/',
        election_result: '/api/v1/office/<office_id>/result',
        create_user: '/api/v1/auth/signup',
        user_login: '/api/v1/auth/login'
      }]
    });
  }
};
exports["default"] = _default;