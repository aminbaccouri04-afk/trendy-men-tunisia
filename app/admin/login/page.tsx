"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Identifiants incorrects");
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-zinc-900 p-8 rounded-lg shadow-lg w-full max-w-md border border-zinc-800">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Admin Login</h1>
        {error && <div className="bg-red-500/10 text-red-500 border border-red-500 p-3 rounded mb-4 text-sm text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-400">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-black border border-zinc-800 rounded text-white focus:outline-none focus:border-gold-500"
              placeholder="admin@trendymen.tn" 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-400">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-black border border-zinc-800 rounded text-white focus:outline-none focus:border-gold-500"
              placeholder="••••••••" 
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gold-500 text-black font-bold py-2 px-4 rounded hover:bg-gold-600 transition duration-200 disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
