const Login = ({ props: { setForm, data, styles, handleSubmit, setShow } }) => {
  const { email, password } = data;
  const handleChange = ({ target: { value, id } }) =>
    setForm((f) => ({ ...f, login: { ...f.login, [id]: value } }));
  return (
    <>
      <h3 className={styles.title}>Login</h3>
      <form id='login' className={styles.authform} onSubmit={handleSubmit}>
        <label htmlFor='email'>Email: </label>
        <input
          onChange={handleChange}
          value={email}
          type='text'
          placeholder='Email'
          id='email'
          required
          autoComplete='email'
        />
        <label htmlFor='password'>Password: </label>
        <input
          onChange={handleChange}
          value={password}
          type='password'
          placeholder='Password'
          id='password'
          required
          autoComplete='current-password'
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
