import NextAuth, { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions: AuthOptions = ({
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_CLIENT_ID || "",
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || "",
            issuer: process.env.KEYCLOAK_ISSUER_URL,
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = String(token.accessToken) || "";
            return session;
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 3 * 60
    },
    jwt: {
        maxAge: 3 * 60
    }
})

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
