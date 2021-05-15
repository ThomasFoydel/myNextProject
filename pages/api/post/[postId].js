import dbConnection from '../../../middlewares/db';
import mongoose from 'mongoose';

async function handler(req, res) {
  const { postId } = req.query;
  var isValid = mongoose.Types.ObjectId.isValid(postId);
  if (isValid) {
    const foundPost = await mongoose.models.Post.findById(postId);
    return res.send(foundPost);
  } else {
    return res.status(404).send();
  }
}
export default dbConnection(handler);
