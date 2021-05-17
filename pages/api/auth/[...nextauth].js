import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import mongoose from 'mongoose';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const foundUser = mongoose.models.User.findOne({
          email: credentials.email,
        });
        if (!foundUser) throw new Error('no user');
        const match = await foundUser.validatePassword(credentials.password);
        if (!match) throw new Error('passwords do not match!');
        return { email: foundUser.email };
      },
    }),
  ],
});
