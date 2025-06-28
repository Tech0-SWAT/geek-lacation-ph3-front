'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        // 既にログイン済みの場合はホームページにリダイレクト
        if (session) {
            router.push('/')
        }
    }, [session, router])

    const handleLogin = () => {
        signIn('auth0', {
            callbackUrl: '/' // ログイン後のリダイレクト先
        })
    }

    const handleLogout = () => {
        signOut({
            callbackUrl: '/login' // ログアウト後のリダイレクト先
        })
    }

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        )
    }

    if (session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">ログイン済み</h2>
                        <p>こんにちは、{session.user?.name || session.user?.email}さん</p>
                        <div className="card-actions justify-end">
                            <button 
                                onClick={() => router.push('/')}
                                className="btn btn-primary"
                            >
                                ホームに戻る
                            </button>
                            <button 
                                onClick={handleLogout}
                                className="btn btn-outline"
                            >
                                ログアウト
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-2xl mb-4">ログイン</h2>
                    <p className="mb-6">Auth0ユニバーサルログインでサインインしてください</p>
                    <div className="card-actions">
                        <button 
                            onClick={handleLogin}
                            className="btn btn-primary btn-wide"
                        >
                            ログイン
                        </button>
                    </div>
                    <div className="divider"></div>
                    <p className="text-sm text-base-content/70">
                        安全なAuth0認証システムを使用しています
                    </p>
                </div>
            </div>
        </div>
    )
}