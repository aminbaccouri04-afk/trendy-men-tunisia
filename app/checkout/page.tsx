"use client";

import { useCartStore } from "@/store/cart";
import { createOrder } from "@/app/actions/order";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { data: session } = useSession();
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
      <h1 className="text-4xl font-black mb-8 tracking-tight">Finaliser la commande</h1>
      {!session && (
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl mb-8 flex justify-between items-center">
          <div>
            <p className="font-bold text-white">Déjà client ?</p>
            <p className="text-sm text-zinc-400">Connectez-vous pour un passage en caisse plus rapide.</p>
          </div>
          <button onClick={() => router.push('/login')} className="bg-zinc-800 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-zinc-700 transition">
            Se connecter
          </button>
        </div>
      )}
      {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl mb-6">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 shadow-xl">
        <h2 className="text-xl font-bold mb-4 border-b border-zinc-800 pb-4">Vos informations</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-400">Nom complet</label>
            <input name="customerName" defaultValue={session?.user?.name || ""} type="text" className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-white focus:border-gold-500 outline-none transition" required />
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
