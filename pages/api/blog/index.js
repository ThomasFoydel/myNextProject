import dbConnection from '../../../middlewares/db';
import mongoose from 'mongoose';
import Post from '../../../models/Post';
const blogHandler = async (req, res) => {
  const respond = (s, d) => {
    res.status(s).send(d);
  };
  if (req.method !== 'GET')
    return respond(400, { error: 'Method not supported' });

  const thomas = mongoose.Types.ObjectId('60aa867eab977cd9f675d9e6');
  const posts = await Post.find({ author: thomas })
    .sort({ createdAt: 'desc' })
    .limit(15)
    .skip(req.body.skip * 15 || 0);
  return res.send(posts);
};

export default dbConnection(blogHandler);
