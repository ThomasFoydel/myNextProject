import dbConnection from '../../../middlewares/db';
import mongoose from 'mongoose';
import Post from '../../../models/Post';
import User from '../../../models/User';
import { getSession } from 'next-auth/client';

const feedHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) return respond(401, { error: 'Unauthorized' });
  const respond = (s, d) => {
    res.status(s).send(d);
  };
  if (req.method !== 'GET')
    return respond(400, { error: 'Method not supported' });
  const foundUser = await User.findById(session.sub);
  if (!foundUser) return respond(400, { error: 'User not found' });

  const posts = await Post.find({'_id': { $in: [foundUser.following]}})
    .sort({ createdAt: 'desc' })
    .limit(15)
    .skip(req.body.skip * 15 || 0);
  return res.send(posts);
};

export default dbConnection(feedHandler);
