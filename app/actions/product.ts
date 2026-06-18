"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

export async function createProduct(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string, 10);
    const sizes = formData.get("sizes") as string;
    const colors = formData.get("colors") as string;
    
    let images = formData.get("images") as string || "";
    const imageFile = formData.get("imageFile") as File | null;

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
      const dirPath = path.join(process.cwd(), "public", "uploads");
      
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      
      const filePath = path.join(dirPath, fileName);
      fs.writeFileSync(filePath, buffer);
      images = `/uploads/${fileName}`;
    }

    let category = await prisma.category.findFirst();
    if (!category) {
      category = await prisma.category.create({ data: { name: "General" } });
    }

    await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        stock,
        images,
        sizes,
        colors,
        categoryId: category.id
      }
    });

    revalidatePath("/admin/products");
    revalidatePath("/products");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to create product", error);
    return { success: false, error: "Failed to create product." };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string, 10);
    const sizes = formData.get("sizes") as string;
    const colors = formData.get("colors") as string;

    let images = formData.get("images") as string || "";
    const imageFile = formData.get("imageFile") as File | null;

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
      const dirPath = path.join(process.cwd(), "public", "uploads");
      
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      
      const filePath = path.join(dirPath, fileName);
      fs.writeFileSync(filePath, buffer);
      images = `/uploads/${fileName}`;
    }

    await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        stock,
        images,
        sizes,
        colors
      }
    });

    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath(`/products/${id}`);

    return { success: true };
  } catch (error) {
    console.error("Failed to update product", error);
    return { success: false, error: "Failed to update product." };
  }
}
