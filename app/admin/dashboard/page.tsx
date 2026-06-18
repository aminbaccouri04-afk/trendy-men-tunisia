import { prisma } from "@/lib/db";

export default async function AdminDashboard() {
    const productsCount = await prisma.product.count();
    const ordersCount = await prisma.order.count();

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded">
                    <h3 className="text-zinc-400 mb-2">Total Produits</h3>
                    <p className="text-4xl font-bold text-gold-500">{productsCount}</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded">
                    <h3 className="text-zinc-400 mb-2">Total Commandes</h3>
                    <p className="text-4xl font-bold text-white">{ordersCount}</p>
                </div>
            </div>
        </div>
    );
}
