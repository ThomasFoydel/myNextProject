import dbConnection from '../../../middlewares/db';
import mongoose from 'mongoose';
import Post from '../../../models/Post';
import User from '../../../models/User';
import Comment from '../../../models/Comment'; // do not remove
import { getSession } from 'next-auth/client';

async function handler(req, res) {
  const respond = (s, d) => res.status(s).send(d);
  const { postId } = req.query;
  const { method } = req;

  const isValid = mongoose.Types.ObjectId.isValid(postId);
  if (!isValid) return res.status(404).send();
  const foundPost = await Post.findById(postId).populate([
    {
      path: 'comments',
      model: 'Comment',
      populate: {
        path: 'author',
        model: 'User',
      },
    },
    { path: 'author' },
  ]);

  if (method === 'GET') {
    return respond(200, foundPost);
  } else if (method === 'DELETE') {
    const session = await getSession({ req });
    if (!session) return respond(401, { error: 'Not authorized' });
    const foundUser = await User.findById(session.sub);
    if (!foundUser) return respond(400, { error: 'User not found' });
    if (foundUser._id.toString() !== foundPost.author._id.toString()) {
      return respond(400, { error: 'Not authorized' });
    }

    foundPost
      .remove()
      .then(() =>
        Comment.remove({ post: foundPost._id }).then(() => respond(200))
      )
      .catch((err) => console.log(err));
  }
}
export default dbConnection(handler);
