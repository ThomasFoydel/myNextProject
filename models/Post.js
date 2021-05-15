import mongoose from 'mongoose';

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
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

// export default Post;
module.exports = mongoose.models.Post || mongoose.model('Post', postSchema);
