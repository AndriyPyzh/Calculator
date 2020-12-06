import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

require('dotenv').config();

const app = express();

app.use(cors());

require('./startup/db')();
require('./startup/routes')(app);
app.use('/', express.static('views'))

app.use(helmet());
app.use(morgan('tiny'));
app.disable('etag');

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
