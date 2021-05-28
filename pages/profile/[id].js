import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession, getSession } from 'next-auth/client';
import { useRouter } from 'next/router';

export default function Profile() {
  const [myPosts, setMyPosts] = useState([]);
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      axios
        .get(`/api/profile/${router.query.id}`)
        .then((res) => {
          console.log(res);
        })
        .then((err) => console.log(err))
        .catch((err) => console.log(err));
    }
  }, [router.query.id]);
  return (
    <div>
      <h2>Profile</h2>
      {myPosts.map((post) => (
        <BlogPost props={{ post }} key={post._id} />
      ))}
    </div>
  );
}
