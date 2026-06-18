"use client";

import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "@/store/cart";

export default function ProductDetails({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes.split(',')[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors.split(',')[0]);
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images.split(',')[0],
      size: selectedSize,
      color: selectedColor,
      quantity: 1
    });
    alert("Produit ajouté au panier !");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-12">
      <div className="relative aspect-[3/4] bg-zinc-900 rounded overflow-hidden">
        {product.images && (
          <Image src={product.images.split(',')[0]} alt={product.name} fill className="object-cover" />
        )}
      </div>
      <div>
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-3xl text-gold-500 font-bold mb-8">{product.price.toFixed(2)} TND</p>
        <p className="text-zinc-400 mb-8 leading-relaxed">{product.description}</p>
        
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Tailles:</h3>
          <div className="flex gap-2">
            {product.sizes.split(',').map((size: string) => (
              <button 
                key={size} 
                onClick={() => setSelectedSize(size)}
                className={`border px-4 py-2 rounded text-sm transition-colors ${selectedSize === size ? 'border-gold-500 text-gold-500' : 'border-zinc-700 hover:border-zinc-500'}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold mb-2">Couleurs:</h3>
          <div className="flex gap-2">
            {product.colors.split(',').map((color: string) => (
              <button 
                key={color} 
                onClick={() => setSelectedColor(color)}
                className={`border px-4 py-2 rounded text-sm transition-colors ${selectedColor === color ? 'border-gold-500 text-gold-500' : 'border-zinc-700 hover:border-zinc-500'}`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleAddToCart}
          className="w-full bg-gold-500 text-black font-bold py-4 rounded hover:bg-gold-600 transition"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
