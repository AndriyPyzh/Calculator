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

// app.get('/tasks/running', (req, res) => {
//     res.send([
//         {
//             name: 'Task1',
//             percentage: 100,
//         },
//         {
//             name: 'Task2',
//             percentage: 75,
//         },
//         {
//             name: 'Task3',
//             percentage: 45,
//         }])
// })
//
// app.get('/tasks/finished', (req, res) => {
//     res.send([
//         {
//             name: 'Task1',
//             matrix: [[1, 2, 3, 4, 5],
//                 [1, 2, 3, 4, 5],
//                 [1, 2, 3, 4, 5],
//                 [1, 2, 3, 4, 5],
//                 [1, 2, 3, 4, 5]],
//             result: [1, 2, 3, 5]
//         },
//         {
//             name: 'Task2',
//             matrix: [[1, 2, 3],
//                 [1, 2, 3],
//                 [1, 2, 3]],
//             result: [1, 2, 3]
//         },
//         {
//             name: 'Task3',
//             matrix: [[1, 2, 3, 4],
//                 [1, 2, 3, 4],
//                 [1, 2, 3, 4]],
//             result: [1, 2, 3]
//         },
//     ])
// })

app.use(helmet());
app.use(morgan('tiny'));
app.disable('etag');

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
