import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    async function middleware(req) {
        // Kullanıcı token'ı ve izinlerine göre erişilebilecek yolları belirle
        const token = req.nextauth.token; // Kullanıcının token bilgisi
        // Regex ile dinamik yolları kontrol etme
        const regex = /^\/dashboard(\/.*)?$/; // '/dashboard' ile başlayan her şey
        const path = req.nextUrl.pathname;

        // Eğer token yoksa veya yol izin verilenler arasında değilse, yönlendir
        if (!token || !regex.test(path)) {
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
    matcher: ['/dashboard', '/dashboard/:path*', '/profile', '/permission-denied'],
};
