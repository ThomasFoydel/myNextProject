import dbConnection from '../../../middlewares/db';
import { getSession } from 'next-auth/client';
import Post from '../../../models/Post';
import User from '../../../models/User';

async function handler(req, res) {
  const { method } = req;
  if (method === 'POST') {
    const session = await getSession({ req });
    if (!session) return res.status(401).send();
    const foundUser = await User.findById(session.sub);
    if (!foundUser) return res.status(422).send();

    const { _id } = foundUser;
    const { title, content } = req.body;
    if (!(title && content)) return res.status(422).send();
    const newPost = await Post.create({
      author: _id,
      title,
      content,
    });
    return res.send(newPost);
  } else {
    return res.status(400).send();
  }
}
export default dbConnection(handler);
