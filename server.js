const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { dbConnect } = require('./utils/db');

const frontPort = process.env.FRONTEND_PORT
app.use(cors({
    origin: [`http://localhost:${frontPort}`],
    credentials: true
}))
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', require('./routes/authRoutes'))
app.use('/api', require('./routes/noteRoutes'))
app.use('/api', require('./routes/adminRoutes'))

app.get('/', (req, res) => res.send('Backend!'));
const port = process.env.PORT
dbConnect();
app.listen(port, () => console.log(`Server is running on port ${port}`));