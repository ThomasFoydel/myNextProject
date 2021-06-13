import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/EditProfile.module.css';

export default function EditProfile() {
  const [form, setForm] = useState({ name: '', github: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { ...form };
    for (const key in data) data[key].trim().length === 0 && delete data[key];
    axios
      .post('/api/editprofile', data)
      .then((res) => {
        console.log(res);
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
          type='text'
          onChange={handleChange}
          id='name'
          value={form.name}
        />
        <label htmlFor='github'>GitHub</label>
        <input
          type='text'
          onChange={handleChange}
          id='github'
          value={form.github}
        />
        <button type='submit'>submit</button>
      </form>
    </div>
  );
}
