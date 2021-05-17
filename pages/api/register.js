import mongoose from 'mongoose';

import dbConnection from '../../middlewares/db';
import mongoose from 'mongoose';

const register = async (req, res) => {
  const respond = (s, d) => res.status(s).json(d);
  if (req.method !== 'POST')
    return respond(400, { error: 'Method not supported' });
  const newUser = await mongoose.model.User.create(req.body);
  return respond(200, newUser);
};

export default dbConnection(register);
