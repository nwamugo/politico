[![Build Status](https://travis-ci.com/nwamugo/politico.svg?branch=ch-unit-tests-endpoints-163505632)](https://travis-ci.com/nwamugo/politico)
[![Coverage Status](https://coveralls.io/repos/github/nwamugo/politico/badge.svg?branch=ch-unit-tests-endpoints-163505632)](https://coveralls.io/github/nwamugo/politico?branch=ch-unit-tests-endpoints-163505632)

# Politico
Politico is a platform that enables citizens give their mandate to politicians running for different government offices while building trust in the process through transparency.

## Links to output

The UI is hosted on Github pages [here](https://nwamugo.github.io/politico/)

The API is deployed on heroku [here](https://warm-mesa-86525.herokuapp.com/)

And a Pivotal Tracker Board you can find [here](https://www.pivotaltracker.com/n/projects/2238916)

### Prerequisites

In developing this software, I set up

* a [Pivotal Tracker Board](https://www.pivotaltracker.com/n/projects/2238916) to manage the project using stories. For example

```
Citizen should be able to sign up
```

### Implemented Features

* Citizens can sign up and login
* A Citizen's Profile Page
* Politicians can express interest to run for a political office
* Citizens can view all politicians running for a specific government office
* Citizens can vote for only one politician per political office
* Citizens can view all political parties
* Electoral body can edit a political party
* Electoral body can delete a political party
* Electoral body should be able to create political parties
* Electoral body should be able to create different political offices
* Citizens are able to see the results of the election

### API Information

METHOD | DESCRIPTION | ENDPOINTS
-------|-------------|-----------
GET | Get all political parties | api/v1/parties
GET | Get a specific political party | api/v1/parties/party_id
GET | Get all political offices | /api/v1/offices
GET | Get a specific political office | api/v1/offices/office_id
POST | Create a political party | /api/v1/parties
POST | Create a political office | /api/v1/offices
PATCH | Edit a political party | /api/v1/parties/party_id/name
DELETE | Delete a political party | /api/v1/parties/party_id


## Running tests

Tests were written using [Mocha](https://mochajs.org) and [Chai](https://chaijs.com) dev-dependencies

### end to end tests

Mocha provides the tools for cleaning the state of the software while Chai is an assertion library that is used alongside Mocha in order to ensure that test cases meet expectations. For example

```
describe('GET /partiess', () => {
  it('should fetch all parties', (done) => {
     api.get('/api/v1/parties')
     .set('Accept', 'application/json')
     .expect(200)
     .end(done);
    });
  });
```

### And coding style tests too

This project was built with the linter eslint and an [airbnb style guide](https://github.com/airbnb/javascript)

```
"rules": {
      "one-var": 0,
      "one-var-declaration-per-line": 0,
      "new-cap": 0,
      "consistent-return": 0,
      }
```

## Built With

* [HTML5 & CSS3 + Vanilla JavaScript](http://developer.mozilla.org/en-US/docs/) - Web development
* [NodeJs](https://nodejs.org/) - JavaScript runtime environment
* [ExpressJs](https://expressjs.com) - Node RESTful API framework
* [PostgreSQL](https://www.postgresql.org/) - Used as database for the app

## Version Control

I use [Github](http://github.com/) for version control.

## Authors

* **Duziem Ugoji**


This project is a Duziem and Andela bootcamp project 2019

## Acknowledgments

* Hat tip to the cipher Felix!

