const Register = ({
  props: { setForm, data, styles, handleSubmit, setShow },
}) => {
  const { name, email, password, confirmPassword } = data;
  const handleChange = ({ target: { value, id } }) =>
    setForm((f) => ({ ...f, register: { ...f.register, [id]: value } }));
  return (
    <>
      <h3 className={styles.title}>Register</h3>
      <form id='register' className={styles.authform} onSubmit={handleSubmit}>
        <label htmlFor='name'>Name: </label>
        <input
          onChange={handleChange}
          value={name}
          type='text'
          placeholder='Name'
          id='name'
          required
          autoComplete='name'
        ></input>
        <label htmlFor='email'>Email: </label>
        <input
          onChange={handleChange}
          value={email}
          type='text'
          placeholder='Email'
          id='email'
          required
          autoComplete='email'
        ></input>
        <label htmlFor='password'>Password: </label>
        <input
          onChange={handleChange}
          value={password}
          type='password'
          placeholder='Password'
          id='password'
          required
          autoComplete='current-password'
        ></input>
        <label htmlFor='confirmPassword'>Confirm Password: </label>
        <input
          onChange={handleChange}
          value={confirmPassword}
          type='password'
          placeholder='Confirm password'
          id='confirmPassword'
          required
          autoComplete='current-password'
        ></input>
        <button type='submit'>Submit</button>
      </form>
      <button className={styles.toggle} onClick={() => setShow('login')}>
        I already have an account
      </button>
    </>
  );
};

export default Register;
