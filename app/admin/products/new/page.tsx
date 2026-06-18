"use client";

import { createProduct } from "@/app/actions/product";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await createProduct(formData);
    
    if (result.success) {
      router.push("/admin/products");
      router.refresh();
    } else {
      alert(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Ajouter un produit</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900 p-8 rounded border border-zinc-800">
        <div>
          <label className="block text-sm mb-2 text-zinc-400">Nom du produit</label>
          <input name="name" type="text" required className="w-full bg-black border border-zinc-800 rounded p-3 text-white focus:border-gold-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm mb-2 text-zinc-400">Description</label>
          <textarea name="description" required className="w-full bg-black border border-zinc-800 rounded p-3 text-white focus:border-gold-500 outline-none" rows={3}></textarea>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2 text-zinc-400">Prix (TND)</label>
            <input name="price" type="number" step="0.01" required className="w-full bg-black border border-zinc-800 rounded p-3 text-white focus:border-gold-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm mb-2 text-zinc-400">Stock</label>
            <input name="stock" type="number" required className="w-full bg-black border border-zinc-800 rounded p-3 text-white focus:border-gold-500 outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-2 text-zinc-400">Tailles (séparées par virgule, ex: S,M,L)</label>
          <input name="sizes" type="text" defaultValue="S,M,L" required className="w-full bg-black border border-zinc-800 rounded p-3 text-white focus:border-gold-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm mb-2 text-zinc-400">Couleurs (séparées par virgule, ex: Noir,Blanc)</label>
          <input name="colors" type="text" defaultValue="Noir,Blanc" required className="w-full bg-black border border-zinc-800 rounded p-3 text-white focus:border-gold-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm mb-2 text-zinc-400">Image du produit (Fichier)</label>
          <input name="imageFile" type="file" accept="image/*" required className="w-full bg-black border border-zinc-800 rounded p-3 text-white focus:border-gold-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gold-500 file:text-black hover:file:bg-gold-600" />
        </div>
        
        <button disabled={loading} type="submit" className="w-full bg-gold-500 text-black font-bold py-4 rounded hover:bg-gold-600 transition disabled:opacity-50">
          {loading ? "Création..." : "Ajouter le produit"}
        </button>
      </form>
    </div>
  );
}
