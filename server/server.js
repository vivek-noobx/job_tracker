require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose')
const cors=require('cors');
const authRoutes = require('./routes/authRoutes');

const app=express();
app.use(cors());
app.use(express.json()) 

app.use('/api/auth', authRoutes);
  
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});


async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log('not connected', err);
  }
}

startServer(); 


