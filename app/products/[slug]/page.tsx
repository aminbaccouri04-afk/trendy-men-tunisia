import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await prisma.product.findUnique({
        where: { slug }
    });

    if (!product) notFound();

    return <ProductDetails product={product} />;
}
