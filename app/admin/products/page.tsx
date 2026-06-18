import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Produits</h1>
        <Link href="/admin/products/new" className="bg-gold-500 text-black px-4 py-2 rounded font-bold flex items-center gap-2 hover:bg-gold-600 transition">
          <Plus size={20} />
          Ajouter un produit
        </Link>
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-800 text-zinc-400 text-sm uppercase">
            <tr>
              <th className="p-4">Produit</th>
              <th className="p-4">Prix</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-zinc-800/50 transition">
                <td className="p-4 font-bold">{product.name}</td>
                <td className="p-4 text-gold-500">{product.price.toFixed(2)} TND</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4 text-right">
                  <Link href={`/admin/products/${product.id}`} className="inline-flex items-center gap-2 text-zinc-400 hover:text-gold-500 transition">
                    <Edit size={18} />
                    Éditer
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
