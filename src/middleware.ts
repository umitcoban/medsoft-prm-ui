import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    async function middleware(req) {
        // Kullanıcı token'ı ve izinlerine göre erişilebilecek yolları belirle
        const token = req.nextauth.token; // Kullanıcının token bilgisi

        const allowedPaths = token
            ? ['/dashboard','/dashboard/:path*', '/profile', '/permission-denied'] // Token varsa erişilebilecek yollar
            : ['/permission-denied']; // Token yoksa sadece bu yola erişim izni

        // Erişim izni kontrolü
        const path = req.nextUrl.pathname; // İstek yapılan yol
        const hasAccess = allowedPaths.includes(path); // Yol izin listesinde mi kontrol et
        console.log("path:", path);
        console.log("hasAccess:", hasAccess);
        // Erişim izni yoksa, kullanıcıyı "/permission-denied" sayfasına yönlendir
        if (!hasAccess) {
            return NextResponse.redirect(new URL('/permission-denied', req.url));
        }

        // Erişim izni varsa, isteği olduğu gibi geçir
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token, // Oturum açmış kullanıcıları doğrula
        },
    }
);

// Middleware'i uygulayacağın yolları belirle
export const config = {
    matcher: ['/dashboard','/dashboard/:path*', '/profile', '/permission-denied'],
};
