import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
    return (
        <Link href={`/products/${product.slug}`} className="group block">
            <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 shadow-lg">
                {product.images && (
                    <Image
                        src={product.images.split(',')[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 group-hover:opacity-80 transition-all duration-700 ease-in-out"
                    />
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <span className="bg-white text-black font-bold py-3 px-6 rounded-full flex items-center gap-2 text-sm shadow-xl">
                            <ShoppingBag size={18} />
                            Découvrir
                        </span>
                    </div>
                </div>

                {/* Tags */}
                {product.stock < 10 && product.stock > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Dernières pièces
                    </div>
                )}
            </div>
            <div className="flex justify-between items-start gap-4">
                <div>
                    <h3 className="font-bold text-lg text-white group-hover:text-gold-500 transition-colors line-clamp-1">{product.name}</h3>
                    <p className="text-zinc-400 text-sm mt-1">{product.category?.name || "Premium"}</p>
                </div>
                <p className="text-gold-500 font-black whitespace-nowrap bg-gold-500/10 px-3 py-1 rounded-lg">
                    {product.price.toFixed(2)} TND
                </p>
            </div>
        </Link>
    );
}
