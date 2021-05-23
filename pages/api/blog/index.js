import dbConnection from '../../../middlewares/db';
import mongoose from 'mongoose';

const blogHandler = async (req, res) => {
  const respond = (s, d) => {
    res.status(s).send(d);
  };
  if (req.method !== 'GET')
    return respond(400, { error: 'Method not supported' });

  const { name, email, password, confirmPassword } = req.body;

  if (!(name && email && password && confirmPassword))
    return respond(422, { error: 'All feilds required' });

  const thomas = mongoose.Types.ObjectId('60aa867eab977cd9f675d9e6');
  const posts = await Post.find({ author: thomas })
    .sort({ createdAt: 'desc' })
    .limit(50)
    .skip(req.body.skip || 0);
  return res.send(posts);
};

export default dbConnection(blogHandler);
