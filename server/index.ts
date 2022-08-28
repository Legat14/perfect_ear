import express from 'express';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3000;

const app = express();

const url = 'mongodb+srv://Legat_14:xedfrblehfrb14@cluster0.v7mspbp.mongodb.net/?retryWrites=true&w=majority';

async function start(): Promise<void> {
  try {
    await mongoose.connect('mongodb+srv://Legat_14:xedfrblehfrb14@cluster0.v7mspbp.mongodb.net/?retryWrites=true&w=majority');
    app.listen(PORT, () => {
      console.log('Server has been started!');
    });
  }
  catch(error) {
    console.error(error);
  }
}

start();

// Оригинальная ссылка с MongoDB:
// mongodb+srv://Legat_14:<password>@cluster0.v7mspbp.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://Legat_14:<password>@cluster0.v7mspbp.mongodb.net/test
