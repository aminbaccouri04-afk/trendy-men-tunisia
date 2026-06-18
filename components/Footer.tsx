export default function Footer() {
    return (
        <footer className="border-t border-zinc-800 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 text-center text-zinc-500">
                <h2 className="text-xl font-bold tracking-widest text-white mb-4">
                    TRENDY <span className="text-gold-500">MEN</span>
                </h2>
                <p className="mb-4">Mode premium pour hommes en Tunisie. Paiement à la livraison.</p>
                <p>© {new Date().getFullYear()} Trendy Men Tunisia. Tous droits réservés.</p>
            </div>
        </footer>
    );
}
