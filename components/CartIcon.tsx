"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart";

export default function CartIcon() {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link href="/cart" className="text-zinc-300 hover:text-gold-500 transition-colors relative flex items-center gap-2 group">
      <div className="relative">
        <ShoppingBag size={22} className="group-hover:scale-110 transition-transform" />
        {mounted && totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-gold-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </div>
      <span className="hidden sm:inline">Panier</span>
    </Link>
  );
}
