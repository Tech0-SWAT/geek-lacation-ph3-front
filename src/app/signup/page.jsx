
"use client"
import { useState } from 'react';
import { useRouter } from "next/navigation";
import bcrypt from 'bcryptjs';

export default function SignIn() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    // ハッシュ化
    const hashedPassword = bcrypt.hashSync(password, 10);
    // const hashedPassword = password;

    
    try {
      const docRef = await addDoc(collection(db, "registration"), {
        name: name,
        password: hashedPassword,
      });
      console.log("Document written with ID: ", docRef.id);
      router.push('/');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="max-w-lg w-full space-y-4 bg-white p-8 shadow-md rounded-lg">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 text-black rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 text-black rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between space-x-4">
            <button type="submit" className="flex-1 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Sign up
            </button>
            <button type="button" onClick={() => router.push('/api/auth/signin')} className="flex-1 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gray-600 shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            Sign in
            </button>
        </div>
      </form>
    </div>
  );
}
