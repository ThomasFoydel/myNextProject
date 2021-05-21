const Login = ({ props: { setForm, data, styles, handleSubmit, setShow } }) => {
  const { email, password } = data;
  const handleChange = ({ target: { value, id } }) =>
    setForm((f) => ({ ...f, login: { ...f.login, [id]: value } }));
  return (
    <>
      <h3>Login</h3>
      <form id='login' className={styles.authform} onSubmit={handleSubmit}>
        <label htmlFor='name'>Email: </label>
        <input
          onChange={handleChange}
          value={email}
          type='text'
          placeholder='Email'
          id='email'
          required
        />
        <label htmlFor='name'>Password: </label>
        <input
          onChange={handleChange}
          value={password}
          type='password'
          placeholder='Password'
          id='password'
          required
        />
        <button type='submit'>Sign in</button>
      </form>
      <button className={styles.toggle} onClick={() => setShow('register')}>
        Sign up
      </button>
    </>
  );
};

export default Login;
