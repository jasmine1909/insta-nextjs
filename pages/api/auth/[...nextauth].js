import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],

  //custom page sign in
  //create auth inside pages folder
  pages: {
    signIn: "/auth/signin",
  },

  //configuration callbacls
  callbacks: {
    async session({ session, user, token }) {
      session.user.username = session.user.name
        .split("")
        .join("")
        .toLowerCase();
      session.user.uid = token.sub;
      return session;
    },
  },
};

export default NextAuth(authOptions);
