"use client";

import { useCartStore } from "@/store/cart";
import { createOrder } from "@/app/actions/order";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-8">Commander</h1>
        <p className="text-zinc-400">Votre panier est vide.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await createOrder(formData, items, getTotalPrice());

    if (result.success) {
      clearCart();
      router.push(`/checkout/success?order=${result.orderNumber}`);
    } else {
      setError(result.error || "Erreur.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Commander</h1>
      {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded mb-6">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900 p-8 rounded border border-zinc-800">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2 text-zinc-400">Nom complet</label>
            <input name="customerName" type="text" className="w-full bg-black border border-zinc-800 rounded p-3 text-white focus:border-gold-500 outline-none" required />
          </div>
          <div>
            <label className="block text-sm mb-2 text-zinc-400">Téléphone</label>
            <input name="phone" type="tel" className="w-full bg-black border border-zinc-800 rounded p-3 text-white focus:border-gold-500 outline-none" required />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-2 text-zinc-400">Adresse de livraison</label>
          <input name="address" type="text" className="w-full bg-black border border-zinc-800 rounded p-3 text-white focus:border-gold-500 outline-none" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2 text-zinc-400">Ville</label>
            <input name="city" type="text" className="w-full bg-black border border-zinc-800 rounded p-3 text-white focus:border-gold-500 outline-none" required />
          </div>
          <div>
            <label className="block text-sm mb-2 text-zinc-400">Code Postal</label>
            <input name="postalCode" type="text" className="w-full bg-black border border-zinc-800 rounded p-3 text-white focus:border-gold-500 outline-none" required />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-2 text-zinc-400">Notes (Optionnel)</label>
          <textarea name="notes" className="w-full bg-black border border-zinc-800 rounded p-3 text-white focus:border-gold-500 outline-none" rows={3}></textarea>
        </div>
        
        <div className="pt-6 border-t border-zinc-800">
          <p className="text-xl font-bold mb-4">Total: {getTotalPrice().toFixed(2)} TND</p>
          <p className="text-gold-500 text-sm mb-6">Paiement à la livraison (Cash on Delivery)</p>
          <button disabled={loading} type="submit" className="w-full bg-white text-black font-bold py-4 rounded hover:bg-zinc-200 transition disabled:opacity-50">
            {loading ? "Traitement..." : "Confirmer la commande"}
          </button>
        </div>
      </form>
    </div>
  );
}
