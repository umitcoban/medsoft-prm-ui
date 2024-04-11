// types/next-auth.d.ts

import "next-auth";
import "next-auth/jwt";
declare module "next-auth" {
    /**
     * Oturum bilgileri için kullanılan Session interface'ini genişletir.
     */
    interface Session {
        accessToken?: string;
        roles: string[] | undefined | null;
    }
}



declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        roles: string[] | undefined | null;
        accessToken: string | undefined | null;
    }
}