import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import config from './config';

import partiesRoutes from './routes/parties';
import officesRoutes from './routes/offices';
import officeRoutes from './routes/office';
import votesRoutes from './routes/votes';
import petitionsRoutes from './routes/petitions';
import userRoutes from './routes/user';

import error from './controllers/error';
import welcome from './controllers/welcome';

const app = express();

app.use(cors());

app.server = http.createServer(app);


app.use(bodyParser.json());


app.use('/api/v1/parties', partiesRoutes);
app.use('/api/v1/offices', officesRoutes);
app.use('/api/v1/office', officeRoutes);
app.use('/api/v1/votes', votesRoutes);
app.use('/api/v1/petitions', petitionsRoutes);
app.use('/api/v1/auth', userRoutes);

app.get('/', welcome.welcome);


app.use('/*', error.get404);

app.server.listen(config.port);

export default app;
