"use client";

import Link from "next/link";
import CartIcon from "./CartIcon";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-tighter text-white">
          TRENDY MEN
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/products" className="text-sm font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition">
            Boutique
          </Link>
          <div className="w-px h-6 bg-zinc-800"></div>
          
          {session ? (
            <div className="flex items-center gap-4">
              {(session.user as { role?: string })?.role === "ADMIN" && (
                <Link href="/admin/dashboard" className="text-zinc-400 hover:text-gold-500 transition" title="Dashboard">
                  <LayoutDashboard size={20} />
                </Link>
              )}
              <div className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
                <User size={18} className="text-gold-500" />
                <span>{session.user?.name?.split(' ')[0] || "Client"}</span>
              </div>
              <button onClick={() => signOut()} className="text-zinc-500 hover:text-red-500 transition" title="Déconnexion">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-zinc-300 hover:text-white transition">
                Connexion
              </Link>
            </div>
          )}

          <div className="w-px h-6 bg-zinc-800"></div>
          <CartIcon />
        </div>
      </div>
    </nav>
  );
}
