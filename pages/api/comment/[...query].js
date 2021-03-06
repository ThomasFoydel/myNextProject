import dbConnection from '../../../middlewares/db';
import mongoose from 'mongoose';
import { getSession } from 'next-auth/client';
import Post from '../../../models/Post';
import User from '../../../models/User';
import Comment from '../../../models/Comment';

const commentHandler = async (req, res) => {
  const respond = (s, d) => res.status(s).send(d);
  const session = await getSession({ req });
  if (!session) return respond(401, { error: 'Unauthorized' });
  const foundUser = await User.findById(session.sub);
  if (!foundUser) return respond(400, { error: 'User not found' });

  if (req.method === 'POST') {
    if (!req.query || !req.query.postId)
      return respond(422, { error: 'Missing query' });

    const { postId } = req.query;
    const isValid = mongoose.Types.ObjectId.isValid(postId);
    if (!isValid) return respond(422, { error: 'Invalid post id' });
    const postIdObj = mongoose.Types.ObjectId(postId);

    const foundPost = await Post.findById(postIdObj);
    if (!foundPost) return respond(400, { error: 'No post found' });

    const { content } = req.body;
    if (!content) return respond(422, { error: 'Comment content required' });
    if (content.length < 15)
      return respond(422, { error: 'Minimum comment length is 15 characters' });
    if (content.length > 500)
      return respond(422, { error: 'Maximum comment length 500 characters' });

    try {
      const newComment = await Comment.create({
        content,
        author: foundUser._id,
        post: foundPost._id,
      });
      const updatedPost = await Post.findByIdAndUpdate(
        foundPost._id,
        { $push: { comments: [newComment._id] } },
        { new: true }
      ).populate([
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
      return respond(200, updatedPost);
    } catch (err) {
      return respond(500, {
        error: 'Database is temporarily down, please try again later',
      });
    }
  } else if (req.method === 'DELETE') {
    const commentId = req.query.query[0];
    if (!commentId) return respond(422, { error: 'Missing comment id' });
    const isValid = mongoose.Types.ObjectId.isValid(commentId);
    if (!isValid) return respond(422, { error: 'Invalid comment id' });
    const commentIdObj = mongoose.Types.ObjectId(commentId);
    const foundComment = await Comment.findById(commentIdObj);
    if (!foundComment) return respond(400, { error: 'No comment found' });

    const updatedPost = await Post.findByIdAndUpdate(
      foundComment.post._id,
      { $pull: { comments: commentIdObj } },
      { new: true }
    ).populate([
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
    Comment.deleteOne({ _id: commentIdObj }).then(() =>
      respond(200, updatedPost)
    );
    return respond(200, updatedPost);
  } else {
    return respond(400, { error: 'Method not supported' });
  }
};

export default dbConnection(commentHandler);
