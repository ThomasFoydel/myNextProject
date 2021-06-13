import dbConnection from '../../../middlewares/db';
import Post from '../../../models/Post';
import User from '../../../models/User';
import mongoose from 'mongoose';
import { getSession } from 'next-auth/client';

async function handler(req, res) {
  const { method } = req;
  const session = await getSession({ req });

  if (method === 'PUT') {
    if (!session || !session.sub) return res.status(422).send();
    const isValid = mongoose.Types.ObjectId.isValid(session.sub);
    if (isValid) {
      const mId = mongoose.Types.ObjectId(session.sub);
      const foundUser = await User.findById(mId);
      if (!foundUser) return res.status(404).send();
      User.findByIdAndUpdate(session.sub, req.body, { new: true })
        .then((updatedUser) => res.send(updatedUser))
        .catch(() => res.status(500).send());
    } else {
      return res.status(404).send();
    }
  }
}
export default dbConnection(handler);
