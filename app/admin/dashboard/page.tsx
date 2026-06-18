import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function AdminDashboard() {
    const productsCount = await prisma.product.count();
    const ordersCount = await prisma.order.count();
    
    const recentOrders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { items: true }
    });

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>
            <div className="grid grid-cols-3 gap-6 mb-12">
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded">
                    <h3 className="text-zinc-400 mb-2">Total Produits</h3>
                    <p className="text-4xl font-bold text-gold-500">{productsCount}</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded">
                    <h3 className="text-zinc-400 mb-2">Total Commandes</h3>
                    <p className="text-4xl font-bold text-white">{ordersCount}</p>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-6">Commandes Récentes</h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-zinc-800 text-zinc-400 text-sm uppercase">
                        <tr>
                            <th className="p-4">N° Commande</th>
                            <th className="p-4">Client</th>
                            <th className="p-4">Contact & Adresse</th>
                            <th className="p-4">Total</th>
                            <th className="p-4">Statut</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {recentOrders.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-zinc-500">Aucune commande.</td>
                            </tr>
                        ) : (
                            recentOrders.map(order => (
                                <tr key={order.id} className="hover:bg-zinc-800/50 transition">
                                    <td className="p-4 font-mono text-sm">{order.orderNumber}</td>
                                    <td className="p-4 font-bold">{order.customerName}</td>
                                    <td className="p-4">
                                        <p className="text-sm font-medium">{order.phone}</p>
                                        <p className="text-xs text-zinc-400">{order.address}, {order.city} {order.postalCode}</p>
                                    </td>
                                    <td className="p-4 font-bold text-gold-500">{order.totalAmount.toFixed(2)} TND</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                                            order.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
                                            order.status === 'Delivered' ? 'bg-green-500/20 text-green-500' :
                                            'bg-zinc-700 text-white'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <div className="p-4 border-t border-zinc-800 text-center">
                    <Link href="/admin/orders" className="text-gold-500 hover:text-gold-400 text-sm font-bold">
                        Voir toutes les commandes
                    </Link>
                </div>
            </div>
        </div>
    );
}
