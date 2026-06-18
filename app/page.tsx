import { prisma } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default async function Home() {
    const products = await prisma.product.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div>
            <section className="h-[80vh] flex items-center justify-center bg-zinc-900 border-b border-gold-500/20">
                <div className="text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">TRENDY <span className="text-gold-500">MEN</span></h1>
                    <p className="text-lg md:text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">La destination premium pour la mode masculine en Tunisie. Élégance, confort et style.</p>
                    <Link href="/products" className="bg-gold-500 text-black px-8 py-4 font-bold rounded hover:bg-gold-600 transition-colors">
                        Découvrir la Collection
                    </Link>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 py-20">
                <h2 className="text-3xl font-bold mb-10 text-center">Nouveautés</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
}
