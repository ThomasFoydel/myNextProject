import { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Auth.module.css';
import Register from './Register';
import Login from './Login';
import { signIn } from 'next-auth/client';

const Auth = () => {
  const [show, setShow] = useState('register');
  const [form, setForm] = useState({
    register: { name: '', email: '', password: '', confirmPassword: '' },
    login: { email: '', password: '' },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id } = e.target;
    if (id === 'register') {
      axios
        .post('/api/auth/register', form[id])
        .then(({ data }) => {
          console.log(data);
        })
        .catch(({ response: { data } }) => {
          console.log(data.error);
        });
    } else if (id === 'login') {
      const result = await signIn('credentials', {
        redirect: false,
        email: form.login.email,
        password: form.login.password,
      });
      console.log(result);
    }
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
