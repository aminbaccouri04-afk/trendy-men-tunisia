import { prisma } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { ArrowRight, Star, Shield, Truck } from "lucide-react";

export default async function Home() {
    const products = await prisma.product.findMany({
        take: 4,
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="flex flex-col min-h-screen">
            {/* HERO SECTION */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <div 
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=2000')" }}
                >
                    {/* Gradient Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <div className="relative z-10 w-full max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-block px-3 py-1 bg-gold-500/20 border border-gold-500/50 text-gold-500 rounded-full text-sm font-bold tracking-widest mb-6">
                            NOUVELLE COLLECTION 2026
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white leading-tight">
                            L'ÉLÉGANCE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">AU MASCULIN</span>
                        </h1>
                        <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-lg leading-relaxed">
                            Découvrez la destination premium pour la mode masculine en Tunisie. Des pièces exclusives conçues pour l'homme moderne.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/products" className="bg-gold-500 text-black px-8 py-4 font-bold rounded-xl hover:bg-gold-400 transition-all flex items-center justify-center gap-2 group">
                                Découvrir la Collection
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="/register" className="bg-transparent border border-zinc-700 text-white px-8 py-4 font-bold rounded-xl hover:bg-zinc-800 transition-all flex items-center justify-center">
                                Créer un compte
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="bg-zinc-950 py-16 border-y border-zinc-900">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex items-center gap-4 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50">
                        <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center text-gold-500">
                            <Truck size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Livraison Express</h3>
                            <p className="text-zinc-400 text-sm">Partout en Tunisie en 24/48h</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50">
                        <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center text-gold-500">
                            <Shield size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Qualité Premium</h3>
                            <p className="text-zinc-400 text-sm">Matériaux soigneusement sélectionnés</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50">
                        <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center text-gold-500">
                            <Star size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Service Client</h3>
                            <p className="text-zinc-400 text-sm">À votre écoute 7j/7</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* LATEST PRODUCTS SECTION */}
            <section className="max-w-6xl mx-auto px-4 py-24">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-black text-white mb-4">Nouveautés</h2>
                        <p className="text-zinc-400">Les dernières tendances fraîchement arrivées.</p>
                    </div>
                    <Link href="/products" className="hidden sm:flex text-gold-500 hover:text-gold-400 font-bold items-center gap-2 transition-colors">
                        Voir tout <ArrowRight size={20} />
                    </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                
                <div className="mt-12 text-center sm:hidden">
                    <Link href="/products" className="inline-flex text-gold-500 hover:text-gold-400 font-bold items-center gap-2 transition-colors">
                        Voir tout <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
