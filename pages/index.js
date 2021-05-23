import Post from '../models/Post';
import User from '../models/User';
import mongoose from 'mongoose';

import styles from '../styles/Blog.module.css';

const BlogPost = ({ props: { post } }) => (
  <div className={styles.blogpost}>
    <h3>{post.title}</h3>
    <p className={styles.date}>
      <span>{new Date(post.createdAt).toLocaleDateString()}, </span>
      <span>{new Date(post.createdAt).toLocaleTimeString()}</span>
    </p>
    <p className={styles.content}>{post.content}</p>
  </div>
);

export default function Home({ posts }) {
  return (
    <div className={styles.blog}>
      <h2>Blog</h2>
      {posts.map((post) => (
        <BlogPost props={{ post }} key={post.id} />
      ))}
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
          .lean()
          .sort({ createdAt: 'desc' })
          .limit(50);

        const stringIdPosts = posts.map(
          ({ _id, author, createdAt, updatedAt, ...post }) => ({
            ...post,
            id: _id.toString(),
            author: author.toString(),
            createdAt: createdAt.toString(),
            updatedAt: updatedAt.toString(),
          })
        );

        return {
          props: { posts: stringIdPosts },
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
