import dbConnection from '../../../middlewares/db';

const login = async (req, res) => {
  res.status(200).json({ name: 'John Doe' });
};

export default dbConnection(login);
