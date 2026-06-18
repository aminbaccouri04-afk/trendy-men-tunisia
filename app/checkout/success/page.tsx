import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order: string }>;
}) {
  const resolvedParams = await searchParams;
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle size={80} className="text-green-500" />
      </div>
      <h1 className="text-4xl font-bold mb-4">Commande Confirmée !</h1>
      <p className="text-zinc-400 mb-2">Merci pour votre achat.</p>
      {resolvedParams.order && (
        <p className="text-zinc-400 mb-8">
          Votre numéro de commande est : <span className="text-gold-500 font-bold">{resolvedParams.order}</span>
        </p>
      )}
      <p className="text-sm text-zinc-500 mb-12">
        Nous vous contacterons très prochainement pour confirmer la livraison. Le paiement se fera à la réception.
      </p>
      <Link href="/products" className="bg-gold-500 text-black px-8 py-3 rounded font-bold hover:bg-gold-600 transition">
        Retour à la boutique
      </Link>
    </div>
  );
}
