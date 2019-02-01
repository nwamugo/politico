import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';

import config from './config';

import partiesRoutes from './routes/parties';
import officesRoutes from './routes/offices';
import officeRoutes from './routes/office';
import votesRoutes from './routes/votes';
import petitionsRoutes from './routes/petitions';

import error from './controllers/error';
import welcome from './controllers/welcome';

import db from './util/database';

const app = express();
app.server = http.createServer(app);

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/v1/parties', partiesRoutes);
app.use('/api/v1/offices', officesRoutes);
app.use('/api/v1/office', officeRoutes);
app.use('/api/v1/votes', votesRoutes);
app.use('/api/v1/petitions', petitionsRoutes);

app.get('/', welcome.welcome);


app.use('/*', error.get404);

app.server.listen(config.port);

export default app;
