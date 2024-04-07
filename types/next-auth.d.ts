// types/next-auth.d.ts

import "next-auth";

declare module "next-auth" {
    /**
     * Oturum bilgileri için kullanılan Session interface'ini genişletir.
     */
    interface Session {
        accessToken?: string;
    }
}
