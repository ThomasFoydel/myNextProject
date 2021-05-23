import Post from '../models/Post';
import User from '../models/User';
import mongoose from 'mongoose';

export default function Home() {
  return (
    <div>
      <h2>Blog</h2>
    </div>
  );
}

export async function getStaticProps() {
  return mongoose
    .connect(process.env.mongodburl)
    .then(async () => {
      try {
        const thomas = await User.findOne({ email: 'thomasjfoydel@gmail.com' });

        const posts = await Post.find({ author: thomas._id })
          .sort({ createdAt: 'desc' })
          .limit(50);

        return {
          props: { posts },
        };
      } catch (err) {
        console.log(err);
        return { props: { posts: [] } };
      }
    })
    .catch((err) => {
      console.log(err);
      return { props: { posts: [] } };
    });
}
