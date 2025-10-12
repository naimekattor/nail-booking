import NextAuth from "next-auth";
import LineProvider from "next-auth/providers/line";

const handler = NextAuth({
  providers: [
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID!,
      clientSecret: process.env.LINE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid profile",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      // When user first logs in, attach LINE profile info to the token
      if (account && profile) {
        token.id = profile.sub; // LINE user ID
        token.name = profile.name;
        token.image = profile.picture;
      }
      return token;
    },
    async session({ session, token }) {
      // Add custom fields to the session object
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.image = token.image;
      return session;
    },
    // This handles where to redirect users after login
    async redirect({ url, baseUrl }) {
      // If NextAuth provides a valid callbackUrl, use it
      if (url && url.startsWith(baseUrl)) return url;

      // Otherwise, redirect to /profile by default
      return "/bisiness/business/nail-studio";
    },
  },
});

export { handler as GET, handler as POST };
