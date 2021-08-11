import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app } from './app';

// reading config files
dotenv.config({
  path: './config.env'
})

// connect DB
if(process.env.DB_CONNECT_STR && process.env.DB_PASSWORD) {
  const dbConnectStr = 
  process.env.DB_CONNECT_STR.replace('<password>', process.env.DB_PASSWORD);
  mongoose
    .connect(dbConnectStr, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('db connected');
      app.listen(process.env.PORT || 8000);
    })
    .catch(err => {
      console.log('failed to connect with DB');
      console.log(err);
      console.log('Shutting down the server...');
      process.exit(1);
    });
}

process.on('unhandledRejection', (err: any) => {
  console.log('unhandle Rejection. shutting down the server...');
  console.log(err, err.name, err.message);
  process.exit(1);
});

