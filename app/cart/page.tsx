"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-8">Votre Panier</h1>
        <p className="text-zinc-400 mb-8">Votre panier est actuellement vide.</p>
        <Link href="/products" className="bg-gold-500 text-black px-8 py-3 rounded font-bold">
          Continuer vos achats
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Votre Panier</h1>
      <div className="bg-zinc-900 border border-zinc-800 rounded p-6 mb-8">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-4 border-b border-zinc-800 last:border-0">
            <div className="relative w-20 h-20 bg-black rounded overflow-hidden">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-sm text-zinc-400">Taille: {item.size} | Couleur: {item.color}</p>
              <p className="text-gold-500 font-bold mt-1">{item.price.toFixed(2)} TND</p>
            </div>
            <div className="flex items-center gap-3 bg-black rounded p-1">
              <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="p-1 text-zinc-400 hover:text-white">
                <Minus size={16} />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 text-zinc-400 hover:text-white">
                <Plus size={16} />
              </button>
            </div>
            <button onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:text-red-400 ml-4">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center mb-8 bg-zinc-900 p-6 rounded border border-zinc-800">
        <span className="text-xl">Total</span>
        <span className="text-3xl font-bold text-gold-500">{getTotalPrice().toFixed(2)} TND</span>
      </div>

      <div className="text-right">
        <Link href="/checkout" className="inline-block bg-gold-500 text-black px-10 py-4 rounded font-bold hover:bg-gold-600 transition">
          Passer à la caisse
        </Link>
      </div>
    </div>
  );
}
