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
// app.use(express.static('/signin.html'))

app.get('/tasks', (req,res) => {
    res.send([
        {
            name: 'task1',
            percentage: 25,
        },
        {
            name: 'task2',
            percentage: 75,
        },
        {
            name: 'task3',
            percentage: 45,
        }])
})

app.use(helmet());
app.use(morgan('tiny'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
