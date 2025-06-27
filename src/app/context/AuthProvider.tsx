'use client'
import { SessionProvider } from 'next-auth/react'

export default function AuthProvider({ children }) {
    // console.log(children)

    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
