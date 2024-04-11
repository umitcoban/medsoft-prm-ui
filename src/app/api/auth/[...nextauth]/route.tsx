import { decode } from 'jsonwebtoken';
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
            try {
                if (account) {
                    const accessToken = account.access_token;
                    token.accessToken = accessToken;
                    const decoded = decode(String(accessToken));
                    if (typeof decoded === 'object' && decoded !== null && 'realm_access' in decoded && decoded.realm_access.roles) {
                        token.roles = decoded.realm_access.roles;
                        console.log(decoded);
                    }
                }
            } catch (error) {
                console.log("decoded error: ", error)
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = String(token.accessToken) || "";
            session.roles = token.roles || [];
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
