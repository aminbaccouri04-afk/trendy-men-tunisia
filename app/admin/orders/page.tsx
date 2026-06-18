import { prisma } from "@/lib/db";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: { include: { product: true } } }
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Commandes Récentes</h1>
      <div className="bg-zinc-900 border border-zinc-800 rounded overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-800 text-zinc-400 text-sm uppercase">
            <tr>
              <th className="p-4">N° Commande</th>
              <th className="p-4">Client</th>
              <th className="p-4">Date</th>
              <th className="p-4">Total</th>
              <th className="p-4">Statut</th>
              <th className="p-4 text-center">Articles</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-zinc-500">Aucune commande pour le moment.</td>
              </tr>
            ) : (
              orders.map(order => (
                <tr key={order.id} className="hover:bg-zinc-800/50 transition">
                  <td className="p-4 font-mono text-sm">{order.orderNumber}</td>
                  <td className="p-4">
                    <p className="font-bold">{order.customerName}</p>
                    <p className="text-xs text-zinc-400">{order.phone}</p>
                  </td>
                  <td className="p-4 text-zinc-400 text-sm">
                    {order.createdAt.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
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
                  <td className="p-4 text-center text-sm">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
