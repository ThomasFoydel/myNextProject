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


  const { sub } = session;
  const isValid = mongoose.Types.ObjectId.isValid(sub);
  if (!isValid) return respond(422, { error: 'Invalid user id' });
  const subIdObj = mongoose.Types.ObjectId(sub);

  const foundUser = await User.findById(subIdObj);
  if (!foundUser) return respond(400, { error: 'User not found' });

  const posts = await Post.find({'author': { $in: foundUser.following}})
    .populate([
        {
          path: 'comments',
          model: 'Comment',
          populate: {
            path: 'author',
            model: 'User',
          },
        },
        { path: 'author' },
      ])
    .sort({ createdAt: 'desc' })
    .limit(15)
    .skip(req.body.skip * 15 || 0);

  res.send(posts)
};

export default dbConnection(feedHandler);
