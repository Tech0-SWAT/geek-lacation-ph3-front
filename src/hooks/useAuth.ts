import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useAuth = () => {
    const { data: session, status } = useSession();
    const [isTokenValid, setIsTokenValid] = useState(true);

    useEffect(() => {
        if (session?.expiresAt) {
            const checkTokenExpiry = () => {
                const currentTime = Date.now() / 1000;
                const isValid = currentTime < session.expiresAt!;
                setIsTokenValid(isValid);
                
                if (!isValid) {
                    console.warn("Access token has expired");
                }
            };

            checkTokenExpiry();
            
            // 1分ごとにトークンの有効期限をチェック
            const interval = setInterval(checkTokenExpiry, 60000);
            
            return () => clearInterval(interval);
        }
    }, [session]);

    return {
        session,
        status,
        isAuthenticated: status === "authenticated",
        isLoading: status === "loading",
        isTokenValid,
        accessToken: session?.accessToken,
    };
};