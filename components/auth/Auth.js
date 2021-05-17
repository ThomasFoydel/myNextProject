import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/Auth.module.css';
import Register from './Register';
import Login from './Login';

const Auth = () => {
  const [show, setShow] = useState('register');
  const [form, setForm] = useState({
    register: { name: '', email: '', password: '', confirmPassword: '' },
    login: { email: '', password: '' },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { id } = e.target;
    axios
      .post(`/api/auth/${id}`, form[id])
      .then(({ data }) => {
        console.log(data);
      })
      .catch(({ response: { data } }) => {
        console.log(data.error);
      });
  };
  const closeAuth = () => {};
  return (
    <div className={styles.auth}>
      <button className={styles.close} onClick={closeAuth}>
        X
      </button>
      {show === 'register' ? (
        <Register
          props={{
            setForm,
            data: form.register,
            styles,
            handleSubmit,
            setShow,
          }}
        />
      ) : (
        <Login
          props={{ setForm, data: form.login, styles, handleSubmit, setShow }}
        />
      )}
    </div>
  );
};

export default Auth;
