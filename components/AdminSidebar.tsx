"use client";

import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-gold-500 mb-10 tracking-wider">
        TRENDY ADMIN
      </h2>
      <nav className="flex-1 space-y-2">
        <Link 
          href="/admin/dashboard" 
          className="flex items-center gap-3 px-4 py-3 text-white bg-zinc-800 rounded-md transition-colors"
        >
          <LayoutDashboard size={20} />
          <span>Tableau de bord</span>
        </Link>
        <Link 
          href="/admin/products" 
          className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
        >
          <Package size={20} />
          <span>Produits</span>
        </Link>
        <Link 
          href="/admin/orders" 
          className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
        >
          <ShoppingCart size={20} />
          <span>Commandes</span>
        </Link>
        <Link 
          href="/admin/customers" 
          className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
        >
          <Users size={20} />
          <span>Clients</span>
        </Link>
      </nav>
      <div className="pt-8 border-t border-zinc-800 mt-auto">
        <Link 
          href="/admin/settings" 
          className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
        >
          <Settings size={20} />
          <span>Paramètres</span>
        </Link>
        <button 
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-zinc-800 rounded-md transition-colors w-full mt-2"
        >
          <LogOut size={20} />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
