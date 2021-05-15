import dbConnection from '../../middlewares/db';
import mongoose from 'mongoose';

const login = async (req, res) => {
  res.status(200).json({ name: 'John Doe' });
};

export default dbConnection(login);
