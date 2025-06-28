'use client'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

interface AuthGuardProps {
    children: ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const { isAuthenticated, isLoading, isTokenValid } = useAuth()
    const router = useRouter()

    useEffect(() => {
        // 未認証の場合はログインページにリダイレクト
        if (!isLoading && !isAuthenticated) {
            console.log('User not authenticated, redirecting to login')
            router.push('/login')
            return
        }

        // トークンが無効な場合もログインページにリダイレクト
        if (!isLoading && isAuthenticated && !isTokenValid) {
            console.warn('Token expired, redirecting to login')
            router.push('/login')
            return
        }
    }, [isAuthenticated, isTokenValid, isLoading, router])

    // ローディング中は読み込み画面を表示
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="loading loading-spinner loading-lg"></div>
                <span className="ml-2">認証確認中...</span>
            </div>
        )
    }

    // 未認証またはトークン無効の場合は何も表示しない（リダイレクト中）
    if (!isAuthenticated || !isTokenValid) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="loading loading-spinner loading-lg"></div>
                <span className="ml-2">ログインページにリダイレクト中...</span>
            </div>
        )
    }

    // 認証済みかつトークン有効の場合のみコンテンツを表示
    return <>{children}</>
}