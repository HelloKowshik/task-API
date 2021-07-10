const express = require('express');
const connectDB = require('./database');
const taskRoutes = require('./routes/taskRouter');
const app = express();
const notFound = require('./middlewire/not-found');
const errorHandlerMiddlewire = require('./middlewire/error-handler');
const PORT = process.env.PORT || 5000;
require('dotenv').config();

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/v1/tasks', taskRoutes);
app.use(notFound); //handles Not Found Route
app.use(errorHandlerMiddlewire); //handles Error

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log('server running...'));
  } catch (err) {
    console.log(err);
  }
};

start();
