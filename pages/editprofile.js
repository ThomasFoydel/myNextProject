import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/EditProfile.module.css';
import { useRouter } from 'next/router';

export default function EditProfile() {
  const [form, setForm] = useState({ name: '', github: '', profilePic: '' });
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { ...form };
    for (const key in data) data[key].trim().length === 0 && delete data[key];
    axios
      .put('/api/profile/edit', data)
      .then((res) => {
        router.push(`/profile/${res.data}`);
      })
      .catch((err) => console.log(err));
  };
  const handleChange = ({ target: { id, value } }) => {
    setForm((f) => ({ ...f, [id]: value }));
  };
  return (
    <div className={styles.editProfile}>
      <form onSubmit={handleSubmit}>
        <h2>Edit Profile</h2>
        <label htmlFor='name'>Name</label>
        <input
          placeholder='Name'
          type='text'
          onChange={handleChange}
          id='name'
          value={form.name}
        />
        <label htmlFor='github'>GitHub</label>
        <input
          placeholder='GitHub'
          type='text'
          onChange={handleChange}
          id='github'
          value={form.github}
        />
        <label htmlFor='profilePic'>Profile Picture URL</label>
        <input
          placeholder='Profile Picture URL'
          type='text'
          onChange={handleChange}
          id='profilePic'
          value={form.profilePic}
        />
        <button type='submit'>submit</button>
      </form>
    </div>
  );
}
