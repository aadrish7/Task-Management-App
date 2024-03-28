const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const tasksRouter = require('./router/tasks-router');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

app.use(tasksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
