const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRouter = require('./route/user');
const taskRouter = require('./route/task')

const sequelize = require('./utils/database');

dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors());
app.use('/user', userRouter);
app.use('/task', taskRouter);

sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
