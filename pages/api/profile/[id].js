import dbConnection from '../../../middlewares/db';
import Post from '../../../models/Post';
import User from '../../../models/User';
import mongoose from 'mongoose';

async function handler(req, res) {
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
      return res.send({ user: foundUser, posts: foundPosts });
    } else {
      return res.status(404).send();
    }
  }
}
export default dbConnection(handler);
