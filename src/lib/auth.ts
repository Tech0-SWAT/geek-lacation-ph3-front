import { NextAuthOptions } from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"

// NextAuth の設定オプション
export const authOptions: NextAuthOptions = {
    providers: [
        Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID ?? "",
            clientSecret: process.env.AUTH0_CLIENT_SECRET ?? "",
            issuer: process.env.AUTH0_ISSUER ?? "",
            authorization: {
                params: {
                    scope: "openid profile email offline_access",
                },
            },
        }),
    ],
    pages: {
        signIn: '/login',
        error: '/login',
    },
    callbacks: {
        async jwt({ token, account }) {
            // 初回ログイン時にアクセストークンやリフレッシュトークンを取り込む
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.expiresAt = account.expires_at;
            }
            
            // アクセストークンの有効期限をチェック
            if (token.expiresAt && Date.now() / 1000 > (token.expiresAt as number)) {
                console.warn("Access token has expired");
                // トークンが期限切れの場合は null を返してログアウトを促す
                return {};
            }
            
            return token;
        },
        async session({ session, token }) {
            // sessionオブジェクトにアクセストークンと有効期限を格納
            if (token?.accessToken) {
                session.accessToken = token.accessToken as string;
                session.expiresAt = token.expiresAt as number;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    // NextAuthがセッション情報を暗号化する際に使用
    secret: process.env.NEXTAUTH_SECRET,
};