"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createOrder(formData: FormData, cartItems: any[], totalAmount: number) {
  try {
    const customerName = formData.get("customerName") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const postalCode = formData.get("postalCode") as string;
    const notes = formData.get("notes") as string | null;

    if (!customerName || !phone || !address || !city || !postalCode || cartItems.length === 0) {
      return { success: false, error: "Tous les champs sont requis." };
    }

    // Generate Order Number
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        phone,
        address,
        city,
        postalCode,
        notes,
        totalAmount,
        items: {
          create: cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      }
    });

    revalidatePath('/admin/orders');
    revalidatePath('/admin/dashboard');

    return { success: true, orderNumber };
  } catch (error) {
    console.error("Order creation error:", error);
    return { success: false, error: "Une erreur s'est produite lors de la commande." };
  }
}
