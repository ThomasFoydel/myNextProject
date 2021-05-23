import dbConnection from '../../../middlewares/db';
import User from '../../../models/User';

const register = async (req, res) => {
  const respond = (s, d) => {
    console.log(s);
    res.status(s).send(d);
  };
  if (req.method !== 'POST')
    return respond(400, { error: 'Method not supported' });

  const { name, email, password, confirmPassword } = req.body;

  if (!(name && email && password && confirmPassword))
    return respond(422, { error: 'All feilds required' });

  if (
    !(
      typeof name === 'string' &&
      typeof email === 'string' &&
      typeof password === 'string' &&
      typeof confirmPassword === 'string'
    )
  ) {
    return respond(422, { error: 'Invalid entry' });
  }

  if (name.length < 6 || name.length > 12) {
    return respond(422, { error: 'Name must be between 6 and 12 characters' });
  }

  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(email).toLowerCase())) {
    return respond(422, { error: 'Valid email required' });
  }

  if (password !== confirmPassword) {
    return respond(422, { error: 'Passwords do not match' });
  }
  const secure = /^(?=.*[\w])(?=.*[\W])[\w\W]{8,}$/;
  if (!secure.test(String(password).toLowerCase())) {
    return respond(422, { error: 'Password must be more secure' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return respond(422, { error: 'Account with this email already exists' });
  }

  User.create(req.body)
    .then((user) => {
      const { password, ...filteredUser } = user._doc;
      return respond(200, filteredUser);
    })
    .catch((err) => {
      console.log(err);
      return respond(500), { error: 'Database is down' };
    });
};

export default dbConnection(register);
