import express from 'express';
import connectToDB from './connection.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import userRouter from './routes/userRoute.js';

const app = express(); // Create an new instane of express
const PORT = 8000; // Define a port
const URL =
  'mongodb+srv://abhi878950:DbHvTH3dvKvIyhMY@shoppyglobe.63qfh.mongodb.net/shopyglove?retryWrites=true&w=majority&appName=Shoppyglobe'; // Define a URL

// Define middleware
app.use(express.json());

// Define a route
app.get('/', (req, res) => {
  res.send('Hello world!');
});
app.use('/api', productRouter); // route related to products
app.use('/api', cartRouter); // route related to cartItems
app.use('/api', userRouter); // route related to user

// connecting to DB & Start the server
connectToDB(URL)
  .then(() => {
    app.listen(8000, () => {
      console.log(`Server is running on port ${PORT} & DB connected`);
    });
  })
  .catch((err) => {
    console.error(err.message);
  });
