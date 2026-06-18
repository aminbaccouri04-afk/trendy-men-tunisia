import Link from "next/link";
import CartIcon from "./CartIcon";

export default function Navbar() {
    return (
        <nav className="border-b border-zinc-800 py-4 px-6 sticky top-0 bg-background/80 backdrop-blur-md z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold tracking-widest">
                    TRENDY <span className="text-gold-500">MEN</span>
                </Link>
                <div className="flex gap-6 items-center">
                    <Link href="/products" className="text-zinc-300 hover:text-gold-500 transition-colors">Boutique</Link>
                    <CartIcon />
                </div>
            </div>
        </nav>
    );
}
