import mongoose from 'mongoose';
import Comment from './Comment';

const postSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    comments: {
      type: [mongoose.Types.ObjectId],
      ref: 'Comment',
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Post || mongoose.model('Post', postSchema);
