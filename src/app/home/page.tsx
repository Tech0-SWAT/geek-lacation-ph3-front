"use client"

import AuthGuard from "@/components/AuthGuard"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function HomePage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
              Home Page Test
            </h1>
            
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                Authentication Test Page
              </h2>
              <p className="text-gray-600 mb-4">
                This page is protected by AuthGuard. Only authenticated users can access this content.
              </p>
              <p className="text-gray-600 mb-4">
                Access token validity is checked periodically.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-800">
                  Auth Features
                </h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• Auth0 Universal Login</li>
                  <li>• Access Token Validation</li>
                  <li>• Auto Redirect</li>
                  <li>• Session Management</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-green-800">
                  Protected Pages
                </h3>
                <ul className="space-y-2 text-green-700">
                  <li>• Top Page</li>
                  <li>• Profile Page</li>
                  <li>• Profile Edit Page</li>
                  <li>• Work Detail Page</li>
                  <li>• This Home Page</li>
                </ul>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AuthGuard>
  )
}