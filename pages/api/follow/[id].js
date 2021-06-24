import dbConnection from '../../../middlewares/db';
import { getSession } from 'next-auth/client';
import User from '../../../models/User';

const handler = async (req, res) => {
  const session = await getSession({ req });

  const { id } = req.query;
  const { method } = req;

  if (!session) return respond(401, { error: 'Unauthorized' });
  const foundUser = await User.findById(session.sub);
  if (!foundUser) return respond(400, { error: 'User not found' });
  if (method === 'POST') {
    return User.findByIdAndUpdate(
      foundUser._id,
      { $push: { following: [id] } },
      { new: true }
    )
      .then((updatedUser) => res.send(updatedUser))
      .catch(() => res.status(500).send({ error: 'Database error' }));
  }
  return res.status(422).send({ error: 'Method not supported' });
};

export default dbConnection(handler);
