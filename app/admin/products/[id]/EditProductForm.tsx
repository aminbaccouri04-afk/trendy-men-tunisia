"use client";

import { updateProduct } from "@/app/actions/product";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditProductForm({ product }: { product: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await updateProduct(product.id, formData);
    
    if (result.success) {
      router.push("/admin/products");
      router.refresh();
    } else {
      alert(result.error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900 p-8 rounded border border-zinc-800">
      <div>
        <label className="block text-sm mb-2 text-zinc-400">Nom du produit</label>
        <input name="name" defaultValue={product.name} type="text" required className="w-full bg-black border border-zinc-800 rounded p-3 text-white focus:border-gold-500 outline-none" />
      </div>
      <div>
        <label className="block text-sm mb-2 text-zinc-400">Description</label>
        <textarea name="description" defaultValue={product.description} required className="w-full bg-black border border-zinc-800 rounded p-3 text-white focus:border-gold-500 outline-none" rows={3}></textarea>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-2 text-gold-500 font-bold">Prix (TND)</label>
          <input name="price" defaultValue={product.price} type="number" step="0.01" required className="w-full bg-black border border-gold-500 rounded p-3 text-white focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm mb-2 text-zinc-400">Stock</label>
          <input name="stock" defaultValue={product.stock} type="number" required className="w-full bg-black border border-zinc-800 rounded p-3 text-white focus:border-gold-500 outline-none" />
        </div>
      </div>
      <div>
        <label className="block text-sm mb-2 text-zinc-400">Tailles (séparées par virgule)</label>
        <input name="sizes" defaultValue={product.sizes} type="text" required className="w-full bg-black border border-zinc-800 rounded p-3 text-white focus:border-gold-500 outline-none" />
      </div>
      <div>
        <label className="block text-sm mb-2 text-zinc-400">Couleurs (séparées par virgule)</label>
        <input name="colors" defaultValue={product.colors} type="text" required className="w-full bg-black border border-zinc-800 rounded p-3 text-white focus:border-gold-500 outline-none" />
      </div>
      <div>
        <label className="block text-sm mb-2 text-zinc-400">Nouvelle Image (Laissez vide pour conserver l'actuelle)</label>
        <input name="imageFile" type="file" accept="image/*" className="w-full bg-black border border-zinc-800 rounded p-3 text-white focus:border-gold-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gold-500 file:text-black hover:file:bg-gold-600" />
        {/* Hidden field to keep old image if no new file is selected */}
        <input name="images" type="hidden" defaultValue={product.images} />
      </div>
      
      <button disabled={loading} type="submit" className="w-full bg-gold-500 text-black font-bold py-4 rounded hover:bg-gold-600 transition disabled:opacity-50">
        {loading ? "Mise à jour..." : "Enregistrer les modifications"}
      </button>
    </form>
  );
}
