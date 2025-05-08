const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');


const { connectDBs } = require('./config/db');

const complaintRoutes = require('./routes/complaintRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes'); 


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

connectDBs()
  .then(() => {
    app.use('/api/complaints', complaintRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/feedback', feedbackRoutes); 
   
    app.get('/', (req, res) => {
      res.send('🚀 API is running...');
    });


    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error connecting to databases:', error);
    process.exit(1); // Exit if DB connection fails
  });
