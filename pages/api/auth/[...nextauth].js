import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import dbConnection from '../../../middlewares/db';
import bcrypt from 'bcryptjs';

import User from '../../../models/User';
const nextAuth = NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const foundUser = await User.findOne({
          email: credentials.email,
        }).select('+password');
        if (!foundUser) throw new Error('no user');

        const match = await bcrypt.compare(
          credentials.password,
          foundUser.password
        );

        if (!match) throw new Error('passwords do not match!');

        return { email: foundUser.email };
      },
    }),
  ],
});

export default dbConnection(nextAuth);
