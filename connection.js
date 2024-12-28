import { connect } from 'mongoose';

// define function to connet to database
const connectToDB = async (url) => {
  try {
    connect(url);
  } catch (error) {
    throw new Error(`Error while connecting to DB: ${error.message}`);
  }
};

export default connectToDB;
