'use client'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface AuthProviderProps {
    children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
    return (
        <SessionProvider 
            // セッションをリフレッシュする間隔（秒）
            refetchInterval={5 * 60} // 5分
            // ウィンドウがフォーカスされた時にセッションを再取得
            refetchOnWindowFocus={true}
        >
            {children}
        </SessionProvider>
    )
}
