import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import mysql from 'mysql2/promise';

const dbConnection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials.username || !credentials.password) {
          return null;
        }

        const [rows] = await dbConnection.execute(
          'SELECT * FROM accounts WHERE username = ?',
          [credentials.username]
        );

        const user = rows[0];

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.username,
          name: user.username,
          email: user.username,
          isAdmin: user.admin === 1,
          balance: parseFloat(user.balance)
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin;
        token.balance = user.balance;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.isAdmin = token.isAdmin;
      session.user.balance = token.balance;
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };