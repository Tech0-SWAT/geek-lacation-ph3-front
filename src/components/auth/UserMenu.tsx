'use client'
import { signOut } from 'next-auth/react'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'

export default function UserMenu() {
    const { session, isAuthenticated } = useAuth()

    if (!isAuthenticated || !session?.user) {
        return null
    }

    const handleLogout = () => {
        signOut({
            callbackUrl: '/login'
        })
    }

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    {session.user.image ? (
                        <img 
                            src={session.user.image} 
                            alt={session.user.name || 'User'} 
                            className="rounded-full"
                        />
                    ) : (
                        <div className="bg-neutral text-neutral-content rounded-full w-10 h-10 flex items-center justify-center">
                            {(session.user.name || session.user.email)?.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
            </div>
            <ul 
                tabIndex={0} 
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
                <li>
                    <div className="justify-between">
                        <span className="font-medium">
                            {session.user.name || session.user.email}
                        </span>
                    </div>
                </li>
                <div className="divider my-1"></div>
                <li>
                    <Link href="/profile" className="justify-between">
                        プロフィール
                    </Link>
                </li>
                <li>
                    <Link href="/settings" className="justify-between">
                        設定
                    </Link>
                </li>
                <div className="divider my-1"></div>
                <li>
                    <button onClick={handleLogout} className="text-error">
                        ログアウト
                    </button>
                </li>
            </ul>
        </div>
    )
}