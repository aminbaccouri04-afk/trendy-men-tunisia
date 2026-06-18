import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }: { product: any }) {
    return (
        <Link href={`/products/${product.slug}`} className="group block">
            <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded bg-zinc-900 border border-zinc-800">
                {product.images && (
                    <Image
                        src={product.images.split(',')[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                )}
            </div>
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-gold-500 font-bold mt-1">{product.price.toFixed(2)} TND</p>
        </Link>
    );
}
