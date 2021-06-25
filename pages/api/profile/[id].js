import dbConnection from '../../../middlewares/db';
import Post from '../../../models/Post';
import User from '../../../models/User';
import mongoose from 'mongoose';
import { getSession } from 'next-auth/client';

async function handler(req, res) {
  const session = await getSession({ req });

  const { method } = req;
  if (method === 'GET') {
    const { id } = req.query;
    if (!id) return res.status(422).send();
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (isValid) {
      const mId = mongoose.Types.ObjectId(id);
      const foundUser = await User.findById(mId);
      const foundPosts = await Post.find({ author: mId })
        .sort({ createdAt: 'desc' })
        .limit(15);
      let following = false;
      if (session) {
        const sessionUser = await User.findById(session.sub);
        if (sessionUser?.following?.includes(foundUser._id)) following = true;
      }
      return res.send({ user: foundUser, posts: foundPosts, following });
    } else {
      return res.status(404).send();
    }
  }
}
export default dbConnection(handler);
