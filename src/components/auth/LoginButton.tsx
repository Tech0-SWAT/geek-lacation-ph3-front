'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useAuth } from '@/hooks/useAuth'

interface LoginButtonProps {
    className?: string
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'xs' | 'sm' | 'md' | 'lg'
    showUserInfo?: boolean
}

export default function LoginButton({ 
    className = '', 
    variant = 'primary',
    size = 'md',
    showUserInfo = false
}: LoginButtonProps) {
    const { session, isAuthenticated, isLoading, isTokenValid } = useAuth()

    const handleLogin = () => {
        signIn('auth0', {
            callbackUrl: window.location.origin
        })
    }

    const handleLogout = () => {
        signOut({
            callbackUrl: '/login'
        })
    }

    if (isLoading) {
        return (
            <button className={`btn btn-${variant} btn-${size} ${className}`} disabled>
                <span className="loading loading-spinner loading-xs"></span>
                Loading...
            </button>
        )
    }

    if (!isAuthenticated) {
        return (
            <button 
                onClick={handleLogin}
                className={`btn btn-${variant} btn-${size} ${className}`}
            >
                ログイン
            </button>
        )
    }

    if (!isTokenValid) {
        return (
            <button 
                onClick={handleLogin}
                className={`btn btn-warning btn-${size} ${className}`}
            >
                再ログイン
            </button>
        )
    }

    if (showUserInfo && session?.user) {
        return (
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className={`btn btn-${variant} btn-${size} ${className}`}>
                    {session.user.image && (
                        <div className="avatar">
                            <div className="w-6 rounded-full">
                                <img src={session.user.image} alt="Profile" />
                            </div>
                        </div>
                    )}
                    {session.user.name || session.user.email}
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li><a onClick={() => window.location.href = '/profile'}>プロフィール</a></li>
                    <li><a onClick={handleLogout}>ログアウト</a></li>
                </ul>
            </div>
        )
    }

    return (
        <button 
            onClick={handleLogout}
            className={`btn btn-outline btn-${size} ${className}`}
        >
            ログアウト
        </button>
    )
}